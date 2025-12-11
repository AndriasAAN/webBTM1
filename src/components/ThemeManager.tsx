'use client';

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { SiteSettings } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { useEffect } from 'react';

/**
 * A client component that fetches the site settings and applies the theme
 * by setting a class on the body element. It listens for real-time updates.
 */
export function ThemeManager() {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => 
    firestore 
      ? doc(firestore, 'website_settings', 'default') 
      : null,
    [firestore]
  );
  const { data: settings } = useDoc<SiteSettings>(settingsRef);

  useEffect(() => {
    const defaultTheme = 'theme-light-pink';

    if (settings?.themeColor) {
      // If a theme is found in the database, apply it
      document.body.className = `theme-${settings.themeColor}`;
    } else {
      // Fallback to the default theme if nothing is set in the database
      document.body.className = defaultTheme;
    }

    // This effect re-runs whenever the 'settings' object changes,
    // which happens in real-time thanks to useDoc.
  }, [settings]);

  // This component does not render anything itself.
  return null;
}
