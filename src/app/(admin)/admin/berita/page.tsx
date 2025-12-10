'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import type { NewsArticle } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { NewsCard } from '@/components/berita/NewsCard';


function NewsRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <div className="aspect-square rounded-md bg-muted animate-pulse w-16 h-16"></div>
      </TableCell>
      <TableCell className="font-medium">
        <div className="h-5 w-48 bg-muted animate-pulse rounded"></div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="h-5 w-24 bg-muted animate-pulse rounded"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>
      </TableCell>
    </TableRow>
  )
}

export default function AdminBeritaPage() {
  const firestore = useFirestore();
  const newsCollectionRef = useMemoFirebase(() => firestore ? query(collection(firestore, 'news_articles'), orderBy('createdAt', 'desc')) : null, [firestore]);
  const { data: newsData, isLoading } = useCollection<NewsArticle>(newsCollectionRef);

  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);

  const handleDelete = async () => {
    if (!articleToDelete || !firestore) return;
    setIsDeleting(true);
    try {
      const docRef = doc(firestore, 'news_articles', articleToDelete.id);
      await deleteDoc(docRef);
      toast({
        title: 'Berhasil Dihapus',
        description: `Artikel "${articleToDelete.title}" telah dihapus.`,
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast({
        variant: 'destructive',
        title: 'Gagal Menghapus',
        description: 'Terjadi kesalahan saat menghapus artikel.',
      });
    } finally {
      setIsDeleting(false);
      setArticleToDelete(null);
    }
  };


  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola Berita</h1>
            <p className="text-muted-foreground">
                Tambah, edit, atau hapus artikel berita untuk website.
            </p>
        </div>
        <Button asChild>
          <Link href="/admin/berita/tambah">
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Berita
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Berita</CardTitle>
          <CardDescription>
            {isLoading ? 'Memuat berita...' : `Total ${newsData?.length || 0} artikel berita.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Gambar</span>
                </TableHead>
                <TableHead>Judul</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal Dibuat</TableHead>
                <TableHead>
                  <span className="sr-only">Aksi</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => <NewsRowSkeleton key={i} />)
              ) : newsData && newsData.length > 0 ? (
                newsData.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={article.title}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={article.thumbnailUrl}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                     {article.createdAt ? format((article.createdAt as any).toDate(), 'dd MMMM yyyy', { locale: id }) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem asChild><Link href={`/admin/berita/edit/${article.id}`}>Edit</Link></DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => setArticleToDelete(article)}>Hapus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Belum ada berita.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AlertDialog open={!!articleToDelete} onOpenChange={(open) => !open && setArticleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda yakin ingin menghapus?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus artikel <span className="font-semibold">"{articleToDelete?.title}"</span> secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
