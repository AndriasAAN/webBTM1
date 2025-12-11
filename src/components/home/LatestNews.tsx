'use client';
import { NewsCard } from '@/components/berita/NewsCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { NewsArticle } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';

export function LatestNewsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export function LatestNews() {
  const firestore = useFirestore();
  const latestNewsQuery = useMemoFirebase(() => 
    firestore 
      ? query(collection(firestore, 'news_articles'), orderBy('createdAt', 'desc'), limit(3)) 
      : null,
    [firestore]
  );
  const { data: latestNews, isLoading } = useCollection<NewsArticle>(latestNewsQuery);

  if (isLoading) {
    return <LatestNewsSkeleton />;
  }

  if (!latestNews || latestNews.length === 0) {
    return (
        <div className="text-center py-16 border rounded-lg bg-background">
            <h2 className="text-2xl font-semibold">Belum Ada Berita</h2>
            <p className="mt-2 text-muted-foreground">
            Saat ini belum ada berita yang dipublikasikan.
            </p>
        </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {latestNews.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}

LatestNews.Skeleton = LatestNewsSkeleton;
