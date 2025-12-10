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
import { Loader2, Upload } from 'lucide-react';
import type { NewsArticle } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';


const formSchema = z.object({
  title: z.string().min(10, { message: 'Judul minimal 10 karakter.' }).max(100, { message: 'Judul maksimal 100 karakter.'}),
  content: z.string().min(50, { message: 'Isi berita minimal 50 karakter.' }),
  thumbnailFile: z.instanceof(File).optional(),
});

interface NewsFormProps {
    article?: NewsArticle;
}

export function NewsForm({ article }: NewsFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore, firebaseApp } = useFirebase();
  const storage = getStorage(firebaseApp);
  
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(article?.thumbnailUrl || null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
      thumbnailFile: undefined,
    },
  });

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('thumbnailFile', file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) {
        toast({ variant: "destructive", title: "Error", description: "Database connection failed." });
        return;
    }
    setIsLoading(true);

    try {
        let thumbnailUrl = article?.thumbnailUrl || '';

        // 1. Upload thumbnail to Firebase Storage if a new one is selected
        if (values.thumbnailFile) {
            const file = values.thumbnailFile;
            const storageRef = ref(storage, `news_thumbnails/${Date.now()}_${file.name}`);
            const uploadResult = await uploadBytes(storageRef, file);
            thumbnailUrl = await getDownloadURL(uploadResult.ref);
        } else if (!thumbnailUrl) {
            // Use a default placeholder if no image is provided for a new article
            thumbnailUrl = 'https://images.unsplash.com/photo-1585241936939-be4099591252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxuZXdzJTIwYXJ0aWNsZXxlbnwwfHx8fDE3NjUzMzM1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080';
        }

        const articleData = {
            title: values.title,
            content: values.content,
            thumbnailUrl: thumbnailUrl,
            updatedAt: serverTimestamp(),
        };

        // 2. Create or update the document in Firestore
        if (article) {
            // Update existing article
            const docRef = doc(firestore, 'news_articles', article.id);
            await setDoc(docRef, {
                ...articleData,
                createdAt: article.createdAt // Preserve original creation date
            }, { merge: true });
        } else {
            // Create new article
            const collectionRef = collection(firestore, 'news_articles');
            await addDoc(collectionRef, {
                ...articleData,
                createdAt: serverTimestamp(),
            });
        }
        
        toast({
            title: article ? 'Berhasil Diperbarui' : 'Berhasil Dipublikasikan',
            description: `Artikel "${values.title}" telah disimpan.`,
        });
        
        router.push('/admin/berita');
        router.refresh(); // Tell Next.js to re-fetch server components
        
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
                    <CardTitle>Thumbnail</CardTitle>
                </CardHeader>
                <CardContent>
                     <FormField
                        control={form.control}
                        name="thumbnailFile"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 relative">
                                            {thumbnailPreview ? (
                                                <Image src={thumbnailPreview} alt="Preview" fill className="object-contain rounded-lg p-2" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk upload</span></p>
                                                    <p className="text-xs text-muted-foreground">PNG, JPG (MAX. 2MB)</p>
                                                </div>
                                            )}
                                            <Input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleThumbnailChange} />
                                        </label>
                                    </div> 
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
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
