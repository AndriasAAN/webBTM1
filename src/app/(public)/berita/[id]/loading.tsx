import { Skeleton } from '@/components/ui/skeleton';

export default function BeritaDetailLoading() {
  return (
     <div className="container max-w-4xl mx-auto py-12 md:py-20">
        <header className="mb-8">
            <Skeleton className="h-6 w-24 mb-4">&nbsp;</Skeleton>
            <Skeleton className="h-10 md:h-14 w-full mb-2">&nbsp;</Skeleton>
            <Skeleton className="h-10 md:h-14 w-3/4">&nbsp;</Skeleton>
            <div className="mt-6 flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full">&nbsp;</Skeleton>
                <Skeleton className="h-5 w-24">&nbsp;</Skeleton>
                <Skeleton className="h-5 w-32">&nbsp;</Skeleton>
            </div>
        </header>
        <Skeleton className="relative aspect-video rounded-xl mb-8 shadow-lg">&nbsp;</Skeleton>
        <div className="space-y-4">
            <Skeleton className="h-5 w-full">&nbsp;</Skeleton>
            <Skeleton className="h-5 w-full">&nbsp;</Skeleton>
            <Skeleton className="h-5 w-5/6">&nbsp;</Skeleton>
        </div>
    </div>
  )
}
