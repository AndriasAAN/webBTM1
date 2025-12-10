import type { Timestamp } from 'firebase/firestore';

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: Timestamp;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  isSlider: boolean;
  createdAt: Timestamp;
  name: string;
}

export interface SiteSettings {
  id?: string;
  headerImageUrl: string;
  tagline: string;
  themeColor: 'light-pink' | 'bright-pink' | 'rose-pink';
}
