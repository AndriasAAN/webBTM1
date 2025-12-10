import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MoreHorizontal, Upload } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { GalleryPhoto } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Mock function. Replace with actual Firebase data fetching.
async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const photoIds = ['gallery-1', 'gallery-2', 'gallery-3', 'carousel-1', 'carousel-2'];
  const photos = PlaceHolderImages.filter(p => photoIds.includes(p.id));
  
  return photos.map(p => ({
    id: p.id,
    url: p.imageUrl,
    isSlider: p.id.startsWith('carousel'),
    createdAt: new Date() as any,
    name: p.description,
  }));
}

export const metadata = {
  title: 'Kelola Galeri - Admin',
};

export default async function AdminGaleriPage() {
  const photos = await getGalleryPhotos();

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola Galeri</h1>
            <p className="text-muted-foreground">
                Unggah dan atur foto untuk galeri dan slider halaman utama.
            </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Unggah Foto
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Foto</CardTitle>
          <CardDescription>
            Total {photos.length} foto di galeri.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Foto</span>
                </TableHead>
                <TableHead>Nama/Deskripsi</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal Unggah</TableHead>
                <TableHead>Slider</TableHead>
                <TableHead>
                  <span className="sr-only">Aksi</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {photos.map((photo) => (
                <TableRow key={photo.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={photo.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={photo.url}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">{photo.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(photo.createdAt.toDate(), 'dd MMMM yyyy', { locale: id })}
                  </TableCell>
                  <TableCell>
                      <Switch
                        checked={photo.isSlider}
                        aria-label="Tampilkan di slider"
                      />
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
