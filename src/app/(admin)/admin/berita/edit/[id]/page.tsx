import { NewsForm } from '@/components/admin/NewsForm';
import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { NewsArticle } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock function. Replace with actual Firebase data fetching.
async function getNewsArticle(id: string): Promise<NewsArticle | null> {
    const item = { id: "news-1", title: "Pembangunan Infrastruktur Desa", content: "Pemerintah desa memulai proyek perbaikan jalan utama untuk meningkatkan konektivitas. Proyek ini diharapkan selesai dalam 3 bulan ke depan dan akan sangat membantu mobilitas warga sehari-hari.", hint: "village development" };
    if (id !== 'news-1') return null;
    
    const placeholder = PlaceHolderImages.find(p => p.id === 'news-1');
    return {
      ...item,
      thumbnailUrl: placeholder!.imageUrl,
      createdAt: new Date(),
    };
}


export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await getNewsArticle(params.id);
  return {
    title: `Edit: ${article?.title || 'Berita'} - Admin`,
  };
}

export default async function EditBeritaPage({ params }: { params: { id: string } }) {
    const article = await getNewsArticle(params.id);

    if (!article) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                    <Link href="/admin/berita">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Kembali</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Berita</h1>
                    <p className="text-muted-foreground max-w-xl truncate">
                        Anda sedang mengedit: "{article.title}"
                    </p>
                </div>
            </div>
            <NewsForm article={article} />
        </div>
    );
}
