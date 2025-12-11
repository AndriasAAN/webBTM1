import type { Timestamp } from 'firebase/firestore';

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface GalleryPhoto {
  id: string;
  name: string;
  url: string;
  isSlider: boolean;
  createdAt?: Timestamp | Date;
}

export type ThemeColor = 
  | 'light-pink' 
  | 'bright-pink' 
  | 'rose-pink'
  | 'sky-blue'
  | 'calm-green'
  | 'sunset-orange'
  | 'elegant-purple';

export interface SiteSettings {
  id?: string;
  headerImageUrl: string;
  tagline: string;
  themeColor: ThemeColor;
  address?: string;
  email?: string;
  phone?: string;
}

export interface Official {
    name: string;
    role: string;
    imageUrl: string;
    hint: string;
}

export interface ProfileSettings {
    id?: string;
    history: string;
    vision: string;
    mission: string;
    officials: Official[];
}
