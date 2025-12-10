'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2, Image as ImageIcon, CalendarIcon } from 'lucide-react';
import type { NewsArticle } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { addDoc, collection, doc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';


const formSchema = z.object({
  title: z.string().min(10, { message: 'Judul minimal 10 karakter.' }).max(100, { message: 'Judul maksimal 100 karakter.'}),
  content: z.string().min(50, { message: 'Isi berita minimal 50 karakter.' }),
  thumbnailUrl: z.string().url({ message: 'URL gambar tidak valid.' }).optional().or(z.literal('')),
  createdAt: z.date({
    required_error: "Tanggal publikasi harus diisi.",
  }),
});

interface NewsFormProps {
    article?: NewsArticle;
}

export function NewsForm({ article }: NewsFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore } = useFirebase();
  
  const [isLoading, setIsLoading] = useState(false);

  const getArticleDate = () => {
    if (!article?.createdAt) return new Date();
    if (article.createdAt instanceof Timestamp) {
      return article.createdAt.toDate();
    }
    return article.createdAt;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
      thumbnailUrl: article?.thumbnailUrl || '',
      createdAt: article ? getArticleDate() : new Date(),
    },
  });

  const thumbnailUrl = form.watch('thumbnailUrl');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) {
        toast({ variant: "destructive", title: "Error", description: "Database connection failed." });
        return;
    }
    setIsLoading(true);

    try {
        let finalThumbnailUrl = values.thumbnailUrl;
        if (!finalThumbnailUrl) {
            finalThumbnailUrl = 'https://images.unsplash.com/photo-1585241936939-be4099591252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxuZXdzJTIwYXJ0aWNsZXxlbnwwfHx8fDE3NjUzMzM1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080';
        }

        const articleData = {
            title: values.title,
            content: values.content,
            thumbnailUrl: finalThumbnailUrl,
            updatedAt: serverTimestamp(),
            createdAt: values.createdAt, // Use date from form
        };

        if (article) {
            const docRef = doc(firestore, 'news_articles', article.id);
            await setDoc(docRef, articleData, { merge: true });
        } else {
            const collectionRef = collection(firestore, 'news_articles');
            await addDoc(collectionRef, articleData);
        }
        
        toast({
            title: article ? 'Berhasil Diperbarui' : 'Berhasil Dipublikasikan',
            description: `Artikel "${values.title}" telah disimpan.`,
        });
        
        router.push('/admin/berita');
        router.refresh();
        
    } catch (error) {
        console.error("Error saving article: ", error);
        toast({
            variant: "destructive",
            title: "Gagal Menyimpan",
            description: "Terjadi kesalahan saat menyimpan artikel. Silakan coba lagi.",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Konten Artikel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Judul Berita</FormLabel>
                        <FormControl>
                            <Input placeholder="Contoh: Peresmian Balai Desa Baru" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Isi Berita</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Tulis isi artikel berita di sini..."
                            className="min-h-[300px]"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Anda dapat menggunakan format Markdown sederhana.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                 <CardHeader>
                    <CardTitle>Pengaturan Publikasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="createdAt"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Publikasi</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pilih tanggal</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="thumbnailUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL Gambar Thumbnail</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <div className="aspect-video rounded-md border border-dashed bg-muted flex items-center justify-center overflow-hidden">
                        {thumbnailUrl ? (
                            <Image src={thumbnailUrl} alt="Preview Thumbnail" width={300} height={170} className="object-cover w-full h-full" />
                        ): (
                            <div className="text-center text-muted-foreground">
                                <ImageIcon className="mx-auto h-8 w-8"/>
                                <p className="text-sm mt-2">Pratinjau Gambar</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                article ? 'Simpan Perubahan' : 'Publikasikan Berita'
              )}
            </Button>
        </div>
      </form>
    </Form>
  );
}
