import { Skeleton } from '@/components/ui/skeleton';

function LatestNewsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl">&nbsp;</Skeleton>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4">&nbsp;</Skeleton>
            <Skeleton className="h-6 w-full">&nbsp;</Skeleton>
            <Skeleton className="h-4 w-full">&nbsp;</Skeleton>
            <Skeleton className="h-4 w-3/4">&nbsp;</Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function BeritaLoading() {
    return (
        <main className="py-16">
            <div className="container">
                <LatestNewsSkeleton />
            </div>
        </main>
    )
}
