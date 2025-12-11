import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { ThemeManager } from '@/components/ThemeManager';

export const metadata: Metadata = {
  title: 'Website Desa Batumarta 1',
  description: 'Website Resmi Desa Batumarta 1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <FirebaseClientProvider>
          <ThemeManager />
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
