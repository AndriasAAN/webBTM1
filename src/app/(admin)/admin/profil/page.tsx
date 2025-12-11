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
import { Loader2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { ProfileSettings, Official } from '@/lib/types';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

const DEFAULT_OFFICIALS: Official[] = [
  { name: 'Bapak Kepala Desa', role: 'Kepala Desa', imageUrl: 'https://picsum.photos/seed/profile-head/400/400', hint: 'person portrait' },
  { name: 'Ibu Sekretaris', role: 'Sekretaris Desa', imageUrl: 'https://picsum.photos/seed/profile-secretary/400/400', hint: 'person portrait' },
  { name: 'Bapak Bendahara', role: 'Bendahara Desa', imageUrl: 'https://picsum.photos/seed/profile-treasurer/400/400', hint: 'person portrait' },
];

function ProfileFormSkeleton() {
  return (
     <div className="max-w-4xl space-y-8">
        <div>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2" />
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-48 mb-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-56 mb-2" />
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </CardContent>
        </Card>
        <Skeleton className="h-11 w-44" />
     </div>
  )
}

export default function AdminProfilPage() {
  const { toast } = useToast();
  const { firestore } = useFirebase();

  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'website_settings', 'profile') : null, [firestore]);
  const { data: currentSettings, isLoading: isLoadingSettings } = useDoc<ProfileSettings>(settingsRef);

  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState('');
  const [vision, setVision] = useState('');
  const [mission, setMission] = useState('');
  const [officials, setOfficials] = useState<Official[]>(DEFAULT_OFFICIALS);

  useEffect(() => {
    if (currentSettings) {
      setHistory(currentSettings.history || '');
      setVision(currentSettings.vision || '');
      setMission(currentSettings.mission || '');
      setOfficials(currentSettings.officials && currentSettings.officials.length > 0 ? currentSettings.officials : DEFAULT_OFFICIALS);
    }
  }, [currentSettings]);

  const handleOfficialChange = (index: number, field: keyof Official, value: string) => {
    const newOfficials = [...officials];
    newOfficials[index] = { ...newOfficials[index], [field]: value };
    setOfficials(newOfficials);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) {
      toast({ variant: "destructive", title: "Error", description: "Koneksi database gagal." });
      return;
    }
    setIsSaving(true);

    try {
      const profileData: ProfileSettings = {
        history,
        vision,
        mission,
        officials,
      };

      await setDoc(doc(firestore, 'website_settings', 'profile'), profileData, { merge: true });
      
      toast({
        title: 'Berhasil Disimpan',
        description: 'Informasi profil desa telah diperbarui.',
      });
    } catch (error) {
       console.error("Error saving profile settings: ", error);
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
    return <ProfileFormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Halaman Profil</h1>
        <p className="text-muted-foreground">
          Ubah konten yang ditampilkan di halaman profil desa.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Konten Teks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="history">Sejarah Singkat</Label>
            <Textarea id="history" value={history} onChange={(e) => setHistory(e.target.value)} placeholder="Tulis sejarah singkat desa..." rows={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vision">Visi</Label>
            <Textarea id="vision" value={vision} onChange={(e) => setVision(e.target.value)} placeholder="Tulis visi desa..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mission">Misi</Label>
            <Textarea id="mission" value={mission} onChange={(e) => setMission(e.target.value)} placeholder="Tulis misi desa, pisahkan setiap poin dengan baris baru." rows={5} />
            <p className="text-sm text-muted-foreground">Untuk membuat daftar, pisahkan setiap poin misi dengan baris baru (Enter).</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Perangkat Desa</CardTitle>
          <CardDescription>Ubah nama, jabatan, dan URL foto untuk setiap perangkat desa.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {officials.map((official, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="aspect-square relative w-full bg-muted rounded-md overflow-hidden">
                    <Image src={official.imageUrl} alt={official.name} fill className="object-cover" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`official-name-${index}`}>Nama</Label>
                    <Input id={`official-name-${index}`} value={official.name} onChange={(e) => handleOfficialChange(index, 'name', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`official-role-${index}`}>Jabatan</Label>
                    <Input id={`official-role-${index}`} value={official.role} onChange={(e) => handleOfficialChange(index, 'role', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor={`official-image-${index}`}>URL Foto</Label>
                    <Input id={`official-image-${index}`} value={official.imageUrl} onChange={(e) => handleOfficialChange(index, 'imageUrl', e.target.value)} />
                </div>
            </div>
          ))}
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

    