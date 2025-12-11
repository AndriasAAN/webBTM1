import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

function GalleryRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="aspect-square rounded-md w-16 h-16">&nbsp;</Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-40 rounded">&nbsp;</Skeleton>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-5 w-24 rounded">&nbsp;</Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-11 rounded-full">&nbsp;</Skeleton>
      </TableCell>
       <TableCell>
        <Skeleton className="h-8 w-8 rounded-full">&nbsp;</Skeleton>
      </TableCell>
    </TableRow>
  )
}


export default function AdminGaleriLoading() {
    return (
        <Table>
            <TableBody>
                {Array.from({ length: 5 }).map((_, i) => <GalleryRowSkeleton key={i} />)}
            </TableBody>
        </Table>
    )
}
