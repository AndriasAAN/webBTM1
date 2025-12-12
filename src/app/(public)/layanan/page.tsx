'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Printer, User, Home, Briefcase, Calendar, Info, Hash } from 'lucide-react';
import Image from 'next/image';

const logoPemdaOku = "data:image/png;base64,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";

const SuratPreview = ({ data }: { data: any }) => {
  const [today, setToday] = useState('');

  useEffect(() => {
    // Set date only on client-side to avoid hydration mismatch
    setToday(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
  }, []);

  return (
    <div id="surat-preview" className="print-area bg-white p-8 md:p-12 font-serif text-black shadow-lg ring-1 ring-black/5">
        <header className="flex items-center justify-between border-b-4 border-black pb-4">
            <div className="w-24">
                <Image src={logoPemdaOku} alt="Logo PEMDA OKU" width={80} height={100} />
            </div>
            <div className="text-center">
                <h2 className="font-bold text-lg md:text-xl">PEMERINTAH KABUPATEN OGAN KOMERING ULU</h2>
                <h3 className="font-bold text-base md:text-lg">KECAMATAN LUBUK RAJA</h3>
                <h1 className="font-bold text-xl md:text-2xl">DESA BATUMARTA I</h1>
                <p className="text-sm">Jalan Raya Batumarta, Kecamatan Lubuk Raja, Kabupaten OKU, Sumatera Selatan</p>
            </div>
            <div className="w-24">&nbsp;</div>
        </header>

        <main className="mt-8">
            <div className="text-center">
                <h4 className="font-bold underline text-lg">SURAT KETERANGAN</h4>
                <p>Nomor: 470 / &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / SK / 2024</p>
            </div>
            <p className="mt-8 text-justify leading-relaxed">
                Yang bertanda tangan di bawah ini, Kepala Desa Batumarta 1, Kecamatan Lubuk Raja, Kabupaten Ogan Komering Ulu, dengan ini menerangkan bahwa:
            </p>
            <table className="mt-4 w-full">
                <tbody>
                    <tr><td className="w-1/3 py-1">Nama</td><td>: {data.nama || '....................................................'}</td></tr>
                    <tr><td className="py-1">Tempat/Tgl. Lahir</td><td>: {data.ttl || '....................................................'}</td></tr>
                    <tr><td className="py-1">Pekerjaan</td><td>: {data.pekerjaan || '....................................................'}</td></tr>
                    <tr><td className="py-1">NIK</td><td>: {data.nik || '....................................................'}</td></tr>
                    <tr><td className="py-1">Alamat</td><td>: {data.alamat || '....................................................'}</td></tr>
                </tbody>
            </table>
            <p className="mt-4 text-justify leading-relaxed">
                Adalah benar merupakan penduduk Desa Batumarta 1. Berdasarkan pengamatan dan sepengetahuan kami, yang bersangkutan berkelakuan baik dan tidak pernah tersangkut perkara pihak berwajib.
            </p>
            <p className="mt-4 text-justify leading-relaxed">
                Surat keterangan ini dibuat untuk keperluan: <span className="font-bold">{data.keperluan || '...................................'}</span>.
            </p>
            <p className="mt-4 text-justify leading-relaxed">
                Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
            </p>
        </main>
        
        <footer className="mt-16 flex justify-end">
            <div className="text-center">
                <p>Batumarta 1, {today}</p>
                <p>Kepala Desa Batumarta 1</p>
                <div className="h-24"></div>
                <p className="font-bold underline">...................................</p>
            </div>
        </footer>
    </div>
  );
};


export default function LayananPage() {
  const [formData, setFormData] = useState({
    nama: '',
    ttl: '',
    pekerjaan: '',
    nik: '',
    alamat: '',
    keperluan: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePrint = () => {
    window.print();
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          body > *:not(.print-area) {
            display: none !important;
          }
          .print-area, .print-area * {
            display: block !important;
            visibility: visible !important;
          }
          .print-area {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            ring-width: 0 !important;
          }
          .print-hidden {
             display: none !important;
          }
        }
      `}</style>
      <header className="bg-muted py-12 print-hidden">
        <div className="container text-center">
          <h1 className="text-4xl font-bold tracking-tight">Layanan Surat Menyurat</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Buat surat keterangan umum secara mandiri dengan mengisi formulir di bawah ini.
          </p>
        </div>
      </header>
      <main className="py-16 bg-muted/20 print-hidden">
        <div className="container grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Formulir Data Diri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nama" className="flex items-center gap-2"><User />Nama Lengkap</Label>
                        <Input id="nama" name="nama" onChange={handleInputChange} placeholder="Masukkan nama lengkap Anda" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ttl" className="flex items-center gap-2"><Calendar />Tempat & Tanggal Lahir</Label>
                        <Input id="ttl" name="ttl" onChange={handleInputChange} placeholder="Contoh: Jakarta, 17 Agustus 1945" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pekerjaan" className="flex items-center gap-2"><Briefcase />Pekerjaan</Label>
                        <Input id="pekerjaan" name="pekerjaan" onChange={handleInputChange} placeholder="Contoh: Wiraswasta" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nik" className="flex items-center gap-2"><Hash />NIK</Label>
                        <Input id="nik" name="nik" onChange={handleInputChange} placeholder="Masukkan 16 digit NIK Anda" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alamat" className="flex items-center gap-2"><Home />Alamat</Label>
                        <Input id="alamat" name="alamat" onChange={handleInputChange} placeholder="Contoh: Jl. Merdeka No. 10, RT 01/RW 02" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="keperluan" className="flex items-center gap-2"><Info />Keperluan Surat</Label>
                        <Textarea id="keperluan" name="keperluan" onChange={handleInputChange} placeholder="Contoh: Untuk melamar pekerjaan" />
                    </div>
                </CardContent>
            </Card>
            <Button onClick={handlePrint} size="lg" className="w-full">
                <Printer className="mr-2" /> Cetak Surat
            </Button>
          </div>
          
          {/* Preview Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Pratinjau Surat</h2>
            <SuratPreview data={formData} />
          </div>
        </div>
      </main>
    </>
  );
}
