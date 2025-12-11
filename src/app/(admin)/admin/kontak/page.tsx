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
import type { SiteSettings } from '@/lib/types';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';


export default function AdminKontakPage() {
  const { toast } = useToast();
  const { firestore } = useFirebase();

  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'website_settings', 'default') : null, [firestore]);
  const { data: currentSettings } = useDoc<SiteSettings>(settingsRef);

  const [isSaving, setIsSaving] = useState(false);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (currentSettings) {
      setAddress(currentSettings.address || '');
      setEmail(currentSettings.email || '');
      setPhone(currentSettings.phone || '');
    }
  }, [currentSettings]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) {
      toast({ variant: "destructive", title: "Error", description: "Koneksi database gagal." });
      return;
    }
    setIsSaving(true);

    try {
      const contactData = {
        address,
        email,
        phone,
      };

      await setDoc(doc(firestore, 'website_settings', 'default'), contactData, { merge: true });
      
      toast({
        title: 'Berhasil Disimpan',
        description: 'Informasi kontak telah diperbarui.',
      });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Kontak</h1>
        <p className="text-muted-foreground">
          Ubah informasi kontak yang ditampilkan di website.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Kontak Website</CardTitle>
          <CardDescription>
            Masukkan alamat, email, dan nomor telepon desa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Jl. Raya Batumarta..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62 123-456-789" />
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
