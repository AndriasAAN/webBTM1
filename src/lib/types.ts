import type { Timestamp } from 'firebase/firestore';

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: Timestamp | Date;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  isSlider: boolean;
  createdAt: Timestamp | Date;
  name: string;
}

export interface SiteSettings {
  id?: string;
  headerImageUrl: string;
  tagline: string;
  themeColor: 'light-pink' | 'bright-pink' | 'rose-pink';
}
