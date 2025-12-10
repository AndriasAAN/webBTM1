import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { NewsArticle } from '@/lib/types';


// Mock function. Replace with actual Firebase data fetching.
async function getNews(): Promise<NewsArticle[]> {
  const newsPlaceholders = [
    { id: "news-1", title: "Pembangunan Infrastruktur Desa", content: "Konten...", hint: "village development" },
    { id: "news-2", title: "Festival Budaya Tahunan Meriah", content: "Konten...", hint: "cultural festival" },
    { id: "news-3", title: "Tim Sepak Bola Remaja Raih Juara", content: "Konten...", hint: "youth sports" },
  ];

  return newsPlaceholders.map((item, index) => {
    const placeholder = PlaceHolderImages.find(p => p.id === `news-${index + 1}`) || PlaceHolderImages.find(p => p.id === 'news-default');
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      thumbnailUrl: placeholder!.imageUrl,
      createdAt: new Date() as any,
    };
  });
}

export const metadata = {
  title: 'Kelola Berita - Admin',
};

export default async function AdminBeritaPage() {
  const newsData = await getNews();

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
            Total {newsData.length} artikel berita.
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
                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                <TableHead>
                  <span className="sr-only">Aksi</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsData.map((article) => (
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
                    {format(article.createdAt.toDate(), 'dd MMMM yyyy', { locale: id })}
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
                        <DropdownMenuItem className="text-destructive">Hapus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
