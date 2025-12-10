'use client';
import { NewsCard } from '@/components/berita/NewsCard';
import { Button } from '@/components/ui/button';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { NewsArticle } from '@/lib/types';
import { collection, query, orderBy } from 'firebase/firestore';
import { LatestNews } from '@/components/home/LatestNews';


export default function BeritaPage() {
  const firestore = useFirestore();
  const newsCollectionRef = useMemoFirebase(() => firestore ? query(collection(firestore, 'news_articles'), orderBy('createdAt', 'desc')) : null, [firestore]);
  const { data: allNews, isLoading } = useCollection<NewsArticle>(newsCollectionRef);


  return (
    <>
      <header className="bg-muted py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold tracking-tight">Berita Desa</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti terus informasi dan kegiatan terbaru yang berlangsung di Desa Batumarta 1.
          </p>
        </div>
      </header>
      <main className="py-16">
        <div className="container">
          {isLoading ? (
            <LatestNews.Skeleton />
          ) : allNews && allNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg">
              <h2 className="text-2xl font-semibold">Belum Ada Berita</h2>
              <p className="mt-2 text-muted-foreground">
                Saat ini belum ada berita yang dipublikasikan. Silakan kembali lagi nanti.
              </p>
            </div>
          )}
          {/* Simple pagination example */}
          <div className="flex justify-center mt-12 space-x-2">
            <Button variant="outline" disabled>Sebelumnya</Button>
            <Button disabled>Selanjutnya</Button>
          </div>
        </div>
      </main>
    </>
  );
}
