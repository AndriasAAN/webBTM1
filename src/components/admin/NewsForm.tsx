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
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import type { NewsArticle } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(10, { message: 'Judul minimal 10 karakter.' }).max(100, { message: 'Judul maksimal 100 karakter.'}),
  content: z.string().min(50, { message: 'Isi berita minimal 50 karakter.' }),
  thumbnail: z.any().optional(),
});

interface NewsFormProps {
    article?: NewsArticle;
}

export function NewsForm({ article }: NewsFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(article?.thumbnailUrl || null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
      thumbnail: undefined,
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
      form.setValue('thumbnail', file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // In a real app, here you would:
    // 1. Upload `values.thumbnail` to Firebase Storage if it exists.
    // 2. Get the download URL.
    // 3. Create or update the document in Firestore 'berita' collection.

    setTimeout(() => { // Mocking async operation
        toast({
            title: article ? 'Berhasil Diperbarui' : 'Berhasil Dipublikasikan',
            description: `Artikel "${values.title}" telah disimpan.`,
        });
        setIsLoading(false);
        router.push('/admin/berita');
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardContent className="pt-6 space-y-4">
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
                <CardContent className="pt-6">
                     <FormField
                        control={form.control}
                        name="thumbnail"
                        render={() => (
                            <FormItem>
                                <FormLabel>Gambar Thumbnail</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                            {thumbnailPreview ? (
                                                <Image src={thumbnailPreview} alt="Preview" width={200} height={100} className="object-contain h-full w-full p-2" />
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
