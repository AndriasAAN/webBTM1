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
import { Loader2, Save, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { SiteSettings, ThemeColor } from '@/lib/types';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminTampilanPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore } = useFirebase();

  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'website_settings', 'default') : null, [firestore]);
  const { data: currentSettings, isLoading: isLoadingSettings } = useDoc<SiteSettings>(settingsRef);

  const [isSaving, setIsSaving] = useState(false);
  const [tagline, setTagline] = useState('');
  const [themeColor, setThemeColor] = useState<ThemeColor>('light-pink');
  const [headerImageUrl, setHeaderImageUrl] = useState('');
  const [taglineColor, setTaglineColor] = useState('white');


  useEffect(() => {
    if (currentSettings) {
      setTagline(currentSettings.tagline);
      setThemeColor(currentSettings.themeColor);
      setHeaderImageUrl(currentSettings.headerImageUrl);
      setTaglineColor(currentSettings.taglineColor || 'white');
      // Apply the theme from DB on initial load
      document.body.className = `theme-${currentSettings.themeColor}`;
    } else {
      // Apply default theme if no settings found
      document.body.className = 'theme-light-pink';
    }
  }, [currentSettings]);
  
  const handleThemeChange = (value: ThemeColor) => {
    setThemeColor(value);
    // Apply theme preview
    document.body.className = `theme-${value}`;
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) {
      toast({ variant: "destructive", title: "Error", description: "Koneksi database gagal." });
      return;
    }
    setIsSaving(true);

    try {
      const settingsData: Partial<SiteSettings> = {
        tagline,
        themeColor,
        headerImageUrl,
        taglineColor,
      };

      await setDoc(doc(firestore, 'website_settings', 'default'), settingsData, { merge: true });
      
      toast({
        title: 'Berhasil Disimpan',
        description: 'Perubahan tampilan telah disimpan.',
      });
      // No need for router.refresh() as the live theme manager will handle it
    } catch (error) {
       console.error("Error saving settings: ", error);
        toast({
            variant: "destructive",
            title: "Gagal Menyimpan",
            description: "Terjadi kesalahan saat menyimpan pengaturan. Silakan coba lagi.",
        });
    } finally {
      setIsSaving(false);
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
            <Label htmlFor="tagline-color">Warna Teks Tagline</Label>
            <Select value={taglineColor} onValueChange={setTaglineColor}>
              <SelectTrigger id="tagline-color">
                <SelectValue placeholder="Pilih warna teks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="white">Putih</SelectItem>
                <SelectItem value="black">Hitam</SelectItem>
                <SelectItem value="red">Merah</SelectItem>
                <SelectItem value="blue">Biru</SelectItem>
                <SelectItem value="green">Hijau</SelectItem>
                <SelectItem value="yellow">Kuning</SelectItem>
              </SelectContent>
            </Select>
             <p className="text-sm text-muted-foreground">
              Pastikan warna teks kontras dengan gambar slider Anda.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="header-image-url">URL Gambar Header</Label>
            <Input id="header-image-url" value={headerImageUrl} onChange={(e) => setHeaderImageUrl(e.target.value)} placeholder="https://..." />
             <div className="mt-2 border-2 border-dashed rounded-lg p-4 bg-muted">
                <div className="w-full aspect-video relative flex items-center justify-center">
                {headerImageUrl ? (
                    <Image src={headerImageUrl} alt="Preview" layout="fill" className="object-contain rounded-md" />
                ) : (
                    <div className="text-center text-muted-foreground">
                        <ImageIcon className="mx-auto h-10 w-10"/>
                        <p className="text-sm mt-2">Pratinjau gambar akan muncul di sini</p>
                    </div>
                )}
                </div>
            </div>
             <p className="text-sm text-muted-foreground">
              Gambar ini akan ditampilkan di antara slider dan teks selamat datang.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="theme-color">Warna Tema</Label>
            <Select value={themeColor} onValueChange={handleThemeChange}>
              <SelectTrigger id="theme-color">
                <SelectValue placeholder="Pilih warna tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light-pink">Pink Muda</SelectItem>
                <SelectItem value="bright-pink">Pink Cerah</SelectItem>
                <SelectItem value="rose-pink">Rose Pink</SelectItem>
                <SelectItem value="sky-blue">Biru Langit</SelectItem>
                <SelectItem value="calm-green">Hijau Teduh</SelectItem>
                <SelectItem value="sunset-orange">Oranye Senja</SelectItem>
                <SelectItem value="elegant-purple">Ungu Elegan</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Mengubah skema warna utama di seluruh website.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button size="lg" type="submit" disabled={isSaving}>
         {isSaving ? (
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
