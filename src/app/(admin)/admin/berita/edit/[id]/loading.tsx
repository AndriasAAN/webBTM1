import { Skeleton } from '@/components/ui/skeleton';

export default function EditBeritaLoading() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Skeleton className="h-7 w-7 rounded-md">&nbsp;</Skeleton>
                <div>
                    <Skeleton className="h-9 w-48 mb-2">&nbsp;</Skeleton>
                    <Skeleton className="h-5 w-72">&nbsp;</Skeleton>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Skeleton className="h-[450px] w-full">&nbsp;</Skeleton>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-[200px] w-full">&nbsp;</Skeleton>
                    <Skeleton className="h-11 w-full">&nbsp;</Skeleton>
                </div>
            </div>
        </div>
    )
}
