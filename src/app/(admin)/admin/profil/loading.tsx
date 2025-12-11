import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


export default function AdminProfilLoading() {
  return (
     <div className="max-w-4xl space-y-8">
        <div>
            <Skeleton className="h-10 w-3/4 mb-2">&nbsp;</Skeleton>
            <Skeleton className="h-5 w-1/2">&nbsp;</Skeleton>
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-48 mb-2">&nbsp;</Skeleton>
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-24 w-full">&nbsp;</Skeleton>
                <Skeleton className="h-24 w-full">&nbsp;</Skeleton>
                <Skeleton className="h-24 w-full">&nbsp;</Skeleton>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-56 mb-2">&nbsp;</Skeleton>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
                <Skeleton className="h-48 w-full">&nbsp;</Skeleton>
                <Skeleton className="h-48 w-full">&nbsp;</Skeleton>
                <Skeleton className="h-48 w-full">&nbsp;</Skeleton>
            </CardContent>
        </Card>
        <Skeleton className="h-11 w-44">&nbsp;</Skeleton>
     </div>
  )
}
