
export type Category = 
  | 'chairs' 
  | 'tables' 
  | 'lounge' 
  | 'puffy' 
  | 'pods' 
  | 'bar_stools' 
  | 'bar_tables' 
  | 'cafe_chairs' 
  | 'cafe_tables';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  subCategory?: string;
  image: string;
}

export interface Project {
  name: string;
  description: string;
  category: 'corporate' | 'restaurant' | 'hospitality';
  image: string;
}

export interface NavItem {
  label: string;
  id: string;
}

export interface HeroSlide {
  id: number;
  type: 'image' | 'video';
  media: string;
  title: string;
  subtitle: string;
}
