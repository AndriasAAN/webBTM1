import Link from 'next/link';
import { Flower2, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <MapPin className="h-5 w-5 text-primary" />
                <span>Jl. Raya Batumarta, Kec. Lubuk Raja, Kab. OKU, Sumatera Selatan</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@batumarta1.desa.id" className="hover:text-primary transition-colors">info@batumarta1.desa.id</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+62123456789" className="hover:text-primary transition-colors">+62 123-456-789</a>
              </li>
            </ul>
          </div>
           <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
             <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/berita" className="hover:text-primary transition-colors">Berita</Link></li>
                <li><Link href="/galeri" className="hover:text-primary transition-colors">Galeri</Link></li>
                <li><Link href="/profil-desa" className="hover:text-primary transition-colors">Profil Desa</Link></li>
             </ul>
           </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Desa Batumarta 1. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
