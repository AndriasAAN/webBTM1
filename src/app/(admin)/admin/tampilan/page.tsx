'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save, Upload } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { SiteSettings } from '@/lib/types';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminTampilanPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore, firebaseApp } = useFirebase();
  const storage = getStorage(firebaseApp);

  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'website_settings', 'default') : null, [firestore]);
  const { data: currentSettings, isLoading: isLoadingSettings } = useDoc<SiteSettings>(settingsRef);

  const [isLoading, setIsLoading] = useState(false);
  const [tagline, setTagline] = useState('');
  const [themeColor, setThemeColor] = useState<SiteSettings['themeColor']>('light-pink');
  const [headerImagePreview, setHeaderImagePreview] = useState<string | null>(null);
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (currentSettings) {
      setTagline(currentSettings.tagline);
      setThemeColor(currentSettings.themeColor);
      setHeaderImagePreview(currentSettings.headerImageUrl);
    }
  }, [currentSettings]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setHeaderImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) {
      toast({ variant: "destructive", title: "Error", description: "Koneksi database gagal." });
      return;
    }
    setIsLoading(true);

    try {
      let headerImageUrl = currentSettings?.headerImageUrl || '';

      if (headerImageFile) {
        const storageRef = ref(storage, `site_settings/header_${Date.now()}_${headerImageFile.name}`);
        const uploadResult = await uploadBytes(storageRef, headerImageFile);
        headerImageUrl = await getDownloadURL(uploadResult.ref);
      }

      const settingsData: SiteSettings = {
        tagline,
        themeColor,
        headerImageUrl,
      };

      await setDoc(doc(firestore, 'website_settings', 'default'), settingsData, { merge: true });
      
      toast({
        title: 'Berhasil Disimpan',
        description: 'Perubahan tampilan telah disimpan.',
      });
      router.refresh();
    } catch (error) {
       console.error("Error saving settings: ", error);
        toast({
            variant: "destructive",
            title: "Gagal Menyimpan",
            description: "Terjadi kesalahan saat menyimpan pengaturan. Silakan coba lagi.",
        });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingSettings) {
    return <div>Memuat pengaturan...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Tampilan Website</h1>
        <p className="text-muted-foreground">
          Sesuaikan tampilan halaman utama website Anda.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Halaman Utama</CardTitle>
          <CardDescription>
            Ubah gambar header, tagline, dan warna tema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline Website</Label>
            <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            <p className="text-sm text-muted-foreground">
              Tagline ini akan muncul di bawah slider halaman utama.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Gambar Header</Label>
            <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 relative">
                    {headerImagePreview ? (
                        <Image src={headerImagePreview} alt="Preview" layout="fill" className="object-cover rounded-lg" />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk ganti gambar</span></p>
                            <p className="text-xs text-muted-foreground">Rekomendasi ukuran: 1600x500px</p>
                        </div>
                    )}
                    <Input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange} />
                </label>
            </div>
             <p className="text-sm text-muted-foreground">
              Gambar ini akan menjadi gambar utama jika tidak ada foto yang ditandai sebagai 'slider'.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="theme-color">Warna Tema</Label>
            <Select value={themeColor} onValueChange={(value: SiteSettings['themeColor']) => setThemeColor(value)}>
              <SelectTrigger id="theme-color">
                <SelectValue placeholder="Pilih warna tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light-pink">Pink Muda</SelectItem>
                <SelectItem value="bright-pink">Pink Cerah</SelectItem>
                <SelectItem value="rose-pink">Rose Pink</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Mengubah skema warna utama di seluruh website.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button size="lg" type="submit" disabled={isLoading}>
         {isLoading ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
            </>
        ) : (
            <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
            </>
        )}
      </Button>
    </form>
  );
}
