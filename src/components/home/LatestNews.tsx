import { NewsCard } from '@/components/berita/NewsCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { NewsArticle } from '@/lib/types';

interface LatestNewsProps {
  promise: Promise<NewsArticle[]>;
}

export async function LatestNews({ promise }: LatestNewsProps) {
  const latestNews = await promise;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {latestNews.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}

LatestNews.Skeleton = function LatestNewsSkeleton() {
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
