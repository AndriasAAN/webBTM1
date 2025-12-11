import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContactFormLoading() {
  return (
     <div className="max-w-3xl space-y-8">
        <div>
            <Skeleton className="h-10 w-3/4 mb-2">&nbsp;</Skeleton>
            <Skeleton className="h-5 w-1/2">&nbsp;</Skeleton>
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-48 mb-2">&nbsp;</Skeleton>
                <Skeleton className="h-5 w-72">&nbsp;</Skeleton>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24">&nbsp;</Skeleton>
                    <Skeleton className="h-10 w-full">&nbsp;</Skeleton>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24">&nbsp;</Skeleton>
                    <Skeleton className="h-10 w-full">&nbsp;</Skeleton>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24">&nbsp;</Skeleton>
                    <Skeleton className="h-10 w-full">&nbsp;</Skeleton>
                </div>
            </CardContent>
        </Card>
        <Skeleton className="h-11 w-44">&nbsp;</Skeleton>
     </div>
  )
}
