'use client';
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
import { Switch } from '@/components/ui/switch';
import { Loader2, MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { GalleryPhoto } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { addDoc, collection, deleteDoc, doc, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function AddPhotoDialog() {
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    const handleSave = async () => {
        if (!firestore || !name || !url) {
            toast({
                variant: 'destructive',
                title: 'Input tidak valid',
                description: 'Nama dan URL gambar harus diisi.'
            });
            return;
        }

        setIsSaving(true);
        try {
            await addDoc(collection(firestore, 'gallery_photos'), {
                name,
                url,
                isSlider: false,
                createdAt: serverTimestamp(),
            });
            toast({
                title: 'Foto Ditambahkan',
                description: 'Foto baru berhasil disimpan ke galeri.'
            });
            setName('');
            setUrl('');
            setOpen(false);
        } catch (error) {
            console.error("Error adding photo: ", error);
            toast({
                variant: 'destructive',
                title: 'Gagal Menambahkan',
                description: 'Terjadi kesalahan saat menyimpan foto.'
            });
        } finally {
            setIsSaving(false);
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Tambah Foto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Foto Baru</DialogTitle>
                    <DialogDescription>
                        Masukkan URL dan deskripsi singkat untuk foto baru Anda.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nama/Deskripsi
                        </Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                            URL Gambar
                        </Label>
                        <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="col-span-3" placeholder="https://..." />
                    </div>
                     {url && (
                        <div className="col-span-4 mt-2">
                            <Image src={url} alt="Preview" width={400} height={225} className="rounded-md object-contain aspect-video bg-muted" />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function AdminGaleriPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const photosCollectionRef = useMemoFirebase(() => firestore ? query(collection(firestore, 'gallery_photos'), orderBy('createdAt', 'desc')) : null, [firestore]);
  const { data: photos, isLoading } = useCollection<GalleryPhoto>(photosCollectionRef);

  const [photoToDelete, setPhotoToDelete] = useState<GalleryPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSliderToggle = async (photo: GalleryPhoto, isChecked: boolean) => {
    if (!firestore) return;
    try {
      const docRef = doc(firestore, 'gallery_photos', photo.id);
      await setDoc(docRef, { isSlider: isChecked }, { merge: true });
      toast({
        title: 'Status Slider Diperbarui',
        description: `Foto "${photo.name}" telah diperbarui.`
      });
    } catch (error) {
       console.error("Error updating slider status: ", error);
       toast({
        variant: 'destructive',
        title: 'Gagal Memperbarui',
        description: 'Terjadi kesalahan saat mengubah status slider.'
       })
    }
  }
  
  const handleDelete = async () => {
    if (!photoToDelete || !firestore) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(firestore, 'gallery_photos', photoToDelete.id));
      toast({
        title: 'Foto Dihapus',
        description: `Foto "${photoToDelete.name}" telah dihapus dari galeri.`
      });
    } catch (error) {
       console.error("Error deleting photo: ", error);
       toast({
        variant: 'destructive',
        title: 'Gagal Menghapus',
        description: 'Terjadi kesalahan saat menghapus foto.'
       })
    } finally {
        setIsDeleting(false);
        setPhotoToDelete(null);
    }
  }

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola Galeri</h1>
            <p className="text-muted-foreground">
                Unggah dan atur foto untuk galeri dan slider halaman utama.
            </p>
        </div>
        <AddPhotoDialog />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Foto</CardTitle>
          <CardDescription>
            {`Total ${photos?.length || 0} foto di galeri.`}
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
              {photos && photos.length > 0 ? (
                photos.map((photo) => (
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
                        {photo.createdAt ? format((photo.createdAt as any).toDate(), 'dd MMMM yyyy', { locale: id }) : 'N/A'}
                    </TableCell>
                    <TableCell>
                        <Switch
                            checked={photo.isSlider}
                            onCheckedChange={(isChecked) => handleSliderToggle(photo, isChecked)}
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
                            <DropdownMenuItem className="text-destructive" onClick={() => setPhotoToDelete(photo)}>Hapus</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Belum ada foto. Klik 'Tambah Foto' untuk memulai.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <AlertDialog open={!!photoToDelete} onOpenChange={(open) => !open && setPhotoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda yakin ingin menghapus foto ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus foto <span className="font-semibold">"{photoToDelete?.name}"</span> secara permanen.
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
