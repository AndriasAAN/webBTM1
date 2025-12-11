import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

function NewsRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="aspect-square rounded-md w-16 h-16">&nbsp;</Skeleton>
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="h-5 w-48 rounded">&nbsp;</Skeleton>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-5 w-24 rounded">&nbsp;</Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8 rounded-full">&nbsp;</Skeleton>
      </TableCell>
    </TableRow>
  )
}

export default function AdminBeritaLoading() {
    return (
         <Table>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => <NewsRowSkeleton key={i} />)}
            </TableBody>
        </Table>
    )
}