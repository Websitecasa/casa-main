
import React from 'react';
import { 
  Armchair, 
  LayoutGrid, 
  Sofa, 
  CircleDot, 
  Box, 
  Coffee, 
  Utensils,
  Briefcase,
  Building2,
  UtensilsCrossed
} from 'lucide-react';
import { Category, Product, Project, HeroSlide } from './types';

// Prefix static assets with the correct base so they work on GitHub Pages (sub-path hosting)
export const assetPath = (relativePath: string) => {
  const normalized = relativePath.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
};

const mediaPath = (path: string) => (path.startsWith('http') ? path : assetPath(path));

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  chairs: <Armchair className="w-4 h-4" />,
  tables: <LayoutGrid className="w-4 h-4" />,
  lounge: <Sofa className="w-4 h-4" />,
  puffy: <CircleDot className="w-4 h-4" />,
  pods: <Box className="w-4 h-4" />,
  phone_booth: <Briefcase className="w-4 h-4" />,
  bar_stools: <Utensils className="w-4 h-4" />,
  bar_tables: <UtensilsCrossed className="w-4 h-4" />,
  cafe_chairs: <Coffee className="w-4 h-4" />,
  cafe_tables: <LayoutGrid className="w-4 h-4" />,
};

export const CATEGORY_LABELS: Record<Category, string> = {
  chairs: "Chairs",
  tables: "Tables",
  lounge: "Sofas",
  
  puffy: "Puffy Seating",
  pods: "Office Pods",
  bar_stools: "Bar Stools",
  bar_tables: "Bar Tables",
  cafe_chairs: "Cafe Chairs",
  cafe_tables: "Cafe Tables"
};

const HERO_SLIDES_RAW: HeroSlide[] = [
  {
    id: 1,
    type: 'video',
    media: "/videos/Casa-Repose-Soft-Seating-Profile.mp4",
    title: "Artisan Craftsmanship",
    subtitle: "Watch our premium soft seating collection come to life with precision and passion."
  },
  {
    id: 2,
    type: 'video',
    media: "/videos/casa3.mp4",
    title: "Precision & Passion",
    subtitle: "Handcrafted details, architecturally inspired for the modern workspace."
  },
  {
    id: 3,
    type: 'video',
    media: "/videos/casa1.mp4",
    title: "Elevated Comfort",
    subtitle: "Redefining the lounge experience with premium materials and ergonomic design."
  },
  {
    id: 4,
    type: 'image',
    media: "/scroll images/ss.png",
    title: "Collaborative Spaces",
    subtitle: "Furniture designed to foster creativity and connection in every interaction."
  }
];

export const HERO_SLIDES: HeroSlide[] = HERO_SLIDES_RAW.map(slide => ({
  ...slide,
  media: mediaPath(slide.media)
}));

// You can add video slides like this:
// {
//   id: 4,
//   type: 'video' as const,
//   media: "/videos/furniture-showcase.mp4",
//   title: "Craftsmanship in Motion",
//   subtitle: "Watch our artisans bring luxury furniture to life"
// }

export const GALLERY_PROJECTS: Project[] = [
  {
      name: "Tech Startup Office",
      description: "Modern open workspace with collaborative zones for 50+ employees",
      category: "corporate",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
  },
  {
      name: "Executive Suite",
      description: "Luxury corner office redesign with premium furniture",
      category: "corporate",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop"
  },
  {
      name: "Co-Working Space",
      description: "Flexible seating with phone booths and meeting pods",
      category: "corporate",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop"
  },
  {
      name: "Banking Hall",
      description: "Professional reception and VIP waiting area",
      category: "corporate",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
  },
  {
      name: "Fine Dining",
      description: "Elegant interior with custom furniture for 80 covers",
      category: "restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
  },
  {
      name: "Cafe Bistro",
      description: "Cozy seating with bar area and outdoor patio",
      category: "restaurant",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop"
  },
  {
      name: "Rooftop Lounge",
      description: "Contemporary outdoor dining with weather-resistant furniture",
      category: "restaurant",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=600&h=400&fit=crop"
  },
  {
      name: "Boutique Hotel Lobby",
      description: "Luxury reception with statement lounge pieces",
      category: "hospitality",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop"
  },
  {
      name: "Hotel Guest Rooms",
      description: "Complete bedroom furniture solutions for 100 rooms",
      category: "hospitality",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop"
  },
  {
      name: "Conference Center",
      description: "Large-scale meeting room setup with modular furniture",
      category: "hospitality",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop"
  }
];

const PRODUCTS_DATA_RAW: Product[] = [
    // Chairs Collection
    { id: 'nc1', category: 'chairs', subCategory: 'Lounge Chairs', name: "Azure Velvet Tub Chair", description: "Contemporary blue velvet armchair with chrome legs", image: "/images/demo.png" },
    { id: 'nc2', category: 'chairs', subCategory: 'Lounge Chairs', name: "Sky Blue Box Armchair", description: "Structured light blue armchair with black piping", image: "/images/sky-blue-box-armchair.png" },
    { id: 'nc3', category: 'chairs', subCategory: 'Lounge Chairs', name: "Midnight Blue Lounge", description: "Deep blue velvet seat with wooden tapered legs", image: "/images/midnight-blue-lounge.png" },
    { id: 'nc4', category: 'chairs', subCategory: 'Visitor Chairs', name: "Sunset Orange Accent", description: "Vibrant orange fabric chair for reception areas", image: "/images/sunset-orange-accent.jpg" },
    { id: 'nc5', category: 'chairs', subCategory: 'Lounge Chairs', name: "Navy Curved Back", description: "Elegant navy blue armchair with curved silhouette", image: "/images/navy-curved-back.jpg" },
    { id: 'nc6', category: 'chairs', subCategory: 'Lounge Chairs', name: "Blush Pink Tub Chair", description: "Soft pink upholstery with comfortable deep seating", image: "/images/blush-pink-tub-chair.jpg" },
    { id: 'nc7', category: 'chairs', subCategory: 'High Back', name: "Scarlet Wingback", description: "Classic high-back wing chair in bold red velvet", image: "/images/scarlet-wingback.jpg" },
    { id: 'nc8', category: 'chairs', subCategory: 'Visitor Chairs', name: "Mustard Modern Chair", description: "Yellow contemporary chair with gold base", image: "/images/mustard-modern-chair.jpg" },
    { id: 'nc9', category: 'chairs', subCategory: 'Visitor Chairs', name: "Charcoal Grey Guest", description: "Minimalist grey fabric chair for office visitors", image: "/images/9.png" },
    { id: 'nc10', category: 'chairs', subCategory: 'High Back', name: "Cognac Leather Wing", description: "Tufted high-back chair in faux leather", image: "/images/10.png" },
    { id: 'nc11', category: 'chairs', subCategory: 'High Back', name: "Emerald High Back", description: "Statement green chair with diamond stitching", image: "/images/11.png" },
    { id: 'nc12', category: 'chairs', subCategory: 'Lounge Chairs', name: "Royal Purple Lounge", description: "Plush purple seating for breakout zones", image: "/images/12.png" },

    // Tables
    { id: 't1', category: 'tables', subCategory: 'Executive Desks', name: "Executive Desk", description: "Large wooden desk with cable management", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&h=300&fit=crop" },
    { id: 't2', category: 'tables', subCategory: 'Workstations', name: "Height Adjustable Table", description: "Adjustable height electric desk", image: "/images/height-adjustable-table.png" },
    { id: 't3', category: 'tables', subCategory: 'Conference Tables', name: "Conference Table", description: "8-10 seater with power outlets", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
    { id: 't4', category: 'tables', subCategory: 'Workstations', name: "Height Adjustable Table", description: "djustable height electric desk", image: "/images/height-adjustable-table-2.png" },
    
    // Lounge
    { id: 'l1', category: 'lounge', subCategory: 'Sofas', name: "Reception Sofa Set", description: "3-seater with matching chairs", image: "/images/13.png" },
    { id: 'l2', category: 'lounge', subCategory: 'Modular Seating', name: "Modular Lounge Seating", description: "Configurable pieces", image: "/images/14.png" },
    { id: 'l3', category: 'lounge', subCategory: 'Accent Chairs', name: "Accent Chair", description: "Designer statement piece", image: "/images/15.png" },

    // New categories: Phone Booths (office pods) and Wooden Cafe Chairs

    // Cafe Chairs - Wooden variety
    { id: 'cc2', category: 'cafe_chairs', subCategory: 'Wooden Chairs', name: "Solid Oak Wooden Chair", description: "High-quality solid oak chair suitable for cafes and bistros (4k image recommended)", image: "/images/17.png" },

    // Puffy
    { id: 'pu1', category: 'puffy', subCategory: 'Bean Bags', name: "Bean Bag XXL", description: "Premium leather bean bag", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" },
    { id: 'pu2', category: 'puffy', subCategory: 'Ottomans & Poufs', name: "Ottoman Pouf", description: "Round cushioned seating", image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&h=300&fit=crop" },

    // Pods
    { id: 'po1', category: 'pods', subCategory: 'Work Pods', name: "Solo Work Pod", description: "Single-person acoustic booth", image: "/images/18.png" },
    { id: 'po2', category: 'pods', subCategory: 'Meeting Pods', name: "Meeting Pod", description: "4-person soundproof pod", image: "/images/18.png" },
    { id: 'po3', category: 'pods', subCategory: 'Phone Booths', name: "Private Phone Booth", description: "Acoustic single-person phone booth for focused calls", image: "/images/17.png" },

    // Bar Stools
    { id: 'bs1', category: 'bar_stools', subCategory: 'Metal Stools', name: "Industrial Metal Stool", description: "Adjustable height with backrest", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop" },
    { id: 'bs2', category: 'bar_stools', subCategory: 'Wooden Stools', name: "Wooden Bar Stool", description: "Classic design with footrest", image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400&h=300&fit=crop" },
    
    // Bar Tables
    { id: 'bt1', category: 'bar_tables', subCategory: 'High Tables', name: "High Top Table", description: "42\" height with metal base", image: "https://images.unsplash.com/photo-1530018607912-eff2daa1b562?w=400&h=300&fit=crop" },
    
    // Cafe Chairs
    { id: 'cc1', category: 'cafe_chairs', subCategory: 'Bistro Chairs', name: "Bistro Chair", description: "Classic French cafe style", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop" },
    
    // Cafe Tables
    { id: 'ct1', category: 'cafe_tables', subCategory: 'Dining Tables', name: "Marble Bistro Table", description: "Elegant round marble top", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop" },
];

export const PRODUCTS_DATA: Product[] = PRODUCTS_DATA_RAW.map(product => ({
  ...product,
  image: mediaPath(product.image)
}));
