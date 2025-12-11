import { Skeleton } from '@/components/ui/skeleton';
import { LatestNewsSkeleton } from '@/components/home/LatestNews';

export default function HomePageLoading() {
  return (
    <>
      <Skeleton className="w-full h-[50vh] md:h-[calc(100vh-4rem)]">&nbsp;</Skeleton>
      <section className="py-16 lg:py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <Skeleton className="h-10 md:h-14 w-3/4 mx-auto mb-4">&nbsp;</Skeleton>
          <Skeleton className="h-10 md:h-14 w-1/2 mx-auto">&nbsp;</Skeleton>
          <div className="mt-6 space-y-2">
            <Skeleton className="h-5 w-full">&nbsp;</Skeleton>
            <Skeleton className="h-5 w-5/6 mx-auto">&nbsp;</Skeleton>
          </div>
        </div>
      </section>
      <section className="bg-muted py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-2">&nbsp;</Skeleton>
            <Skeleton className="h-5 w-80 mx-auto">&nbsp;</Skeleton>
          </div>
          <LatestNewsSkeleton />
        </div>
      </section>
    </>
  );
}
