import { Skeleton } from '@/components/ui/skeleton';

export default function GalleryLoading() {
  return (
    <main className="py-16">
        <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full rounded-lg">&nbsp;</Skeleton>
                    <Skeleton className="h-4 w-3/4">&nbsp;</Skeleton>
                </div>
            ))}
            </div>
        </div>
    </main>
  )
}
