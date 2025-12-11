'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Flag, Target } from 'lucide-react';
import Image from 'next/image';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { ProfileSettings } from '@/lib/types';


export default function ProfilDesaPage() {

  const firestore = useFirestore();
  const profileRef = useMemoFirebase(() => firestore ? doc(firestore, 'website_settings', 'profile') : null, [firestore]);
  const { data: settings } = useDoc<ProfileSettings>(profileRef);

  const history = settings?.history || "Desa Batumarta 1 merupakan salah satu desa yang berada di Kecamatan Lubuk Raja, Kabupaten Ogan Komering Ulu. Desa ini didirikan pada tahun XXXX melalui program transmigrasi. Nama \"Batumarta\" memiliki makna filosofis yang mendalam bagi para pendirinya, melambangkan harapan akan kehidupan yang kokoh dan sejahtera.\n\nSejak awal berdirinya, masyarakat Desa Batumarta 1 dikenal dengan semangat gotong royong dan kerja kerasnya. Berbagai pembangunan, baik fisik maupun non-fisik, telah berhasil diwujudkan berkat kerjasama antara pemerintah desa dan seluruh lapisan masyarakat. Kini, Desa Batumarta 1 terus berkembang menjadi desa yang dinamis dengan tetap menjaga kearifan lokal.";
  const vision = settings?.vision || '"Terwujudnya Desa Batumarta 1 yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa."';
  const mission = settings?.mission || 'Meningkatkan kualitas sumber daya manusia.\nMengoptimalkan potensi ekonomi desa.\nMeningkatkan kualitas infrastruktur desa.\nMewujudkan tata kelola pemerintahan yang baik.\nMelestarikan nilai-nilai budaya dan kearifan lokal.';
  const officials = settings?.officials || [
    { name: 'Bapak Kepala Desa', role: 'Kepala Desa', imageUrl: 'https://picsum.photos/seed/profile-head/400/400', hint: 'person portrait' },
    { name: 'Ibu Sekretaris', role: 'Sekretaris Desa', imageUrl: 'https://picsum.photos/seed/profile-secretary/400/400', hint: 'person portrait' },
    { name: 'Bapak Bendahara', role: 'Bendahara Desa', imageUrl: 'https://picsum.photos/seed/profile-treasurer/400/400', hint: 'person portrait' },
  ];

  return (
    <>
      <header className="bg-muted py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold tracking-tight">Profil Desa Batumarta 1</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Mengenal lebih dekat Desa Batumarta 1, dari sejarah hingga tatanan pemerintahannya.
          </p>
        </div>
      </header>
      <main className="py-16">
        <div className="container max-w-5xl mx-auto space-y-16">
        
        <section id="sejarah">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                <BookOpen className="w-7 h-7 text-primary"/>
                Sejarah Singkat Desa
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                <p>{history}</p>
            </CardContent>
            </Card>
        </section>

        <section id="visi-misi" className="grid md:grid-cols-2 gap-8">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                <Flag className="w-7 h-7 text-primary"/>
                Visi
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                {vision}
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="w-7 h-7 text-primary"/>
                Misi
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    {mission.split('\n').map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </CardContent>
            </Card>
        </section>

        <section id="perangkat-desa">
            <h2 className="text-3xl font-bold text-center mb-10">Perangkat Desa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {officials.map((official) => (
                    <Card key={official.name} className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 flex flex-col items-center">
                            <div className="w-32 h-32 mb-4 relative">
                                <Avatar className="w-32 h-32 border-4 border-primary/20">
                                    <AvatarImage src={official.imageUrl} alt={official.name} asChild>
                                      <Image src={official.imageUrl} alt={official.name} fill className="object-cover" data-ai-hint={official.hint} />
                                    </AvatarImage>
                                    <AvatarFallback>{official.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <h3 className="text-lg font-semibold">{official.name}</h3>
                            <p className="text-primary font-medium">{official.role}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        </div>
      </main>
    </>
  );
}
