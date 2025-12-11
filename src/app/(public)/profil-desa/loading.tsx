import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePageLoading() {
  return (
    <div className="container max-w-5xl mx-auto space-y-16 py-16">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48">&nbsp;</Skeleton>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-5 w-full">&nbsp;</Skeleton>
          <Skeleton className="h-5 w-full">&nbsp;</Skeleton>
          <Skeleton className="h-5 w-4/5">&nbsp;</Skeleton>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-24">&nbsp;</Skeleton>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-full">&nbsp;</Skeleton>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-24">&nbsp;</Skeleton>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-5 w-full">&nbsp;</Skeleton>
            <Skeleton className="h-5 w-4/5">&nbsp;</Skeleton>
            <Skeleton className="h-5 w-full">&nbsp;</Skeleton>
          </CardContent>
        </Card>
      </div>
      <div className="text-center">
        <Skeleton className="h-9 w-64 mx-auto mb-10">&nbsp;</Skeleton>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 flex flex-col items-center">
                <Skeleton className="w-32 h-32 rounded-full mb-4">&nbsp;</Skeleton>
                <Skeleton className="h-6 w-3/4 mb-2">&nbsp;</Skeleton>
                <Skeleton className="h-5 w-1/2">&nbsp;</Skeleton>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
