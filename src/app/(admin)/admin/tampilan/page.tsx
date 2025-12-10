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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { SiteSettings } from '@/lib/types';

// Mock data. Replace with actual Firebase data fetching.
const currentSettings: SiteSettings = {
    tagline: 'Membangun Bersama, Sejahtera Bersama',
    headerImageUrl: PlaceHolderImages.find(p => p.id === 'default-header')?.imageUrl || '',
    themeColor: 'light-pink',
};


export default function AdminTampilanPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tagline, setTagline] = useState(currentSettings.tagline);
  const [themeColor, setThemeColor] = useState(currentSettings.themeColor);
  const [headerImagePreview, setHeaderImagePreview] = useState<string | null>(currentSettings.headerImageUrl);
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);

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
    setIsLoading(true);

    // Mocking async operation
    setTimeout(() => {
      console.log('Saving data:', { tagline, themeColor, headerImageFile });
      toast({
        title: 'Berhasil Disimpan',
        description: 'Perubahan tampilan telah disimpan.',
      });
      setIsLoading(false);
      // router.refresh(); // To see changes if they were real
    }, 1500);
  };


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
