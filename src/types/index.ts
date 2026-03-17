// ─── Food Board (오음추) ───────────────────────────────────────────────────────
export type MealTime = '전체' | '아침' | '점심' | '저녁' | '간식';

export interface FoodPost {
  id: number;
  title: string;
  description: string;
  category: Exclude<MealTime, '전체'>;
  author: string;
  likes: number;
  comments: number;
  imageUrl?: string;
  createdAt: string;
}

// ─── Tips Community (꿀꿀) ────────────────────────────────────────────────────
export interface TipPost {
  id: number;
  title: string;
  description: string;
  author: string;
  likes: number;
  comments: number;
  imageUrl?: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

// ─── Food Roulette ────────────────────────────────────────────────────────────
export interface RouletteItem {
  id: number;
  name: string;
}

// ─── Location Map ─────────────────────────────────────────────────────────────
export type Region = '서울' | '대전' | '부산' | '울산' | '전주';

export interface Restaurant {
  id: number;
  name: string;
  menuDescription: string;
  location: string;
  region: Region;
  likes: number;
  imageUrl?: string;
  /** Latitude for real map integration */
  lat?: number;
  /** Longitude for real map integration */
  lng?: number;
}
