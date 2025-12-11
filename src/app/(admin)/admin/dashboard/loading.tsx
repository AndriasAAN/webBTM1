import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 w-24">&nbsp;</Skeleton>
        <Skeleton className="h-4 w-4">&nbsp;</Skeleton>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-12 mb-2">&nbsp;</Skeleton>
        <Skeleton className="h-4 w-32">&nbsp;</Skeleton>
      </CardContent>
    </Card>
  )
}

export default function DashboardLoading() {
    return (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
    )
}