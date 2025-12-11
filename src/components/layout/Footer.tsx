'use client';

import Link from 'next/link';
import { Flower2, Mail, MapPin, Phone } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { SiteSettings } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useState } from 'react';

function FooterSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center md:items-start">
                 <Skeleton className="h-8 w-48 mb-4" />
                 <Skeleton className="h-5 w-56" />
            </div>
            <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg mb-4">Kontak Kami</h3>
                <div className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                </div>
            </div>
        </div>
    )
}

export function Footer() {
    const firestore = useFirestore();
    const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'website_settings', 'default') : null, [firestore]);
    const { data: settings, isLoading } = useDoc<SiteSettings>(settingsRef);
    
    // State to manage client-side rendering and avoid hydration mismatch
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const address = settings?.address || 'Jl. Raya Batumarta, Kec. Lubuk Raja, Kab. OKU, Sumatera Selatan';
    const email = settings?.email || 'info@batumarta1.desa.id';
    const phone = settings?.phone || '+62 123-456-789';

    const renderContent = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center md:items-start">
                <Link href="/" className="flex items-center gap-2 mb-4" passHref>
                <Flower2 className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">Desa Batumarta 1</span>
                </Link>
                <p className="text-muted-foreground text-center md:text-left max-w-xs">
                Mewujudkan desa yang mandiri, sejahtera, dan berbudaya.
                </p>
            </div>
            <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg mb-4">Kontak Kami</h3>
                <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center justify-center md:justify-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{address}</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href={`tel:${phone.replace(/\s|-/g, '')}`} className="hover:text-primary transition-colors">{phone}</a>
                </li>
                </ul>
            </div>
        </div>
    );

  return (
    <footer className="bg-muted">
      <div className="container py-8">
        {(!isClient || isLoading) ? <FooterSkeleton /> : renderContent()}
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Desa Batumarta 1. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}