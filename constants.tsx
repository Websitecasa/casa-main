
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
  const full = `${import.meta.env.BASE_URL}${normalized}`;
  return encodeURI(full);
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
    media: "/scroll_images/ss.png",
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
    { id: 'nc13', category: 'chairs', subCategory: 'Lounge Chairs', name: "Jojo Lounge Chair", description: "Soft upholstered lounge chair with sculpted profile", image: "/images/chairs/jojo.avif" },
    { id: 'nc2', category: 'chairs', subCategory: 'Lounge Chairs', name: "Sky Blue Box Armchair", description: "Structured light blue armchair with black piping", image: "/images/sky-blue-box-armchair.png" },
    { id: 'nc3', category: 'chairs', subCategory: 'Lounge Chairs', name: "Midnight Blue Lounge", description: "Deep blue velvet seat with wooden tapered legs", image: "/images/midnight-blue-lounge.png" },
    { id: 'nc14', category: 'chairs', subCategory: 'Lounge Chairs', name: "Basket Lounge", description: "Curved lounge chair with basket weave detail", image: "/images/lounge-chairs/basket.jpg" },
    { id: 'nc15', category: 'chairs', subCategory: 'Lounge Chairs', name: "Bold Lounge", description: "Bold silhouette with plush cushioning", image: "/images/lounge-chairs/bold-lounge.jpg" },
    { id: 'nc16', category: 'chairs', subCategory: 'Lounge Chairs', name: "Bond", description: "Streamlined lounge seat with modern base", image: "/images/lounge-chairs/bond.jpg" },
    { id: 'nc17', category: 'chairs', subCategory: 'Lounge Chairs', name: "Breeze", description: "Airy profile with soft upholstery", image: "/images/lounge-chairs/breeze.jpg" },
    { id: 'nc18', category: 'chairs', subCategory: 'Lounge Chairs', name: "Cresent", description: "Crescent backrest with cozy seat", image: "/images/lounge-chairs/cresent.jpg" },
    { id: 'nc19', category: 'chairs', subCategory: 'Lounge Chairs', name: "Creta", description: "Compact lounge with tailored seams", image: "/images/lounge-chairs/creta.jpg" },
    { id: 'nc20', category: 'chairs', subCategory: 'Lounge Chairs', name: "Digit", description: "Minimal lounge chair with slim legs", image: "/images/lounge-chairs/digit.jpg" },
    { id: 'nc21', category: 'chairs', subCategory: 'Lounge Chairs', name: "Download", description: "Relaxed lounge with wrapped arms", image: "/images/lounge-chairs/download.jpg" },
    { id: 'nc22', category: 'chairs', subCategory: 'Lounge Chairs', name: "Elasticity", description: "Elastic sling-inspired comfort", image: "/images/lounge-chairs/elasticity.jpg" },
    { id: 'nc23', category: 'chairs', subCategory: 'Lounge Chairs', name: "Hatt", description: "Low-profile lounge with wide arms", image: "/images/lounge-chairs/hatt.jpg" },
    { id: 'nc24', category: 'chairs', subCategory: 'Lounge Chairs', name: "Knoll", description: "Classic-inspired lounge with crisp lines", image: "/images/lounge-chairs/knoll.jpg" },
    { id: 'nc25', category: 'chairs', subCategory: 'Lounge Chairs', name: "Master", description: "Executive lounge with enveloping back", image: "/images/lounge-chairs/master.jpg" },
    { id: 'nc26', category: 'chairs', subCategory: 'Lounge Chairs', name: "Modway", description: "Mid-century lounge with pedestal base", image: "/images/lounge-chairs/modway.jpg" },
    { id: 'nc27', category: 'chairs', subCategory: 'Lounge Chairs', name: "Office Lounge", description: "Office-ready lounge with upright support", image: "/images/lounge-chairs/office.jpg" },
    { id: 'nc28', category: 'chairs', subCategory: 'Lounge Chairs', name: "Sonet", description: "Rounded lounge with pillowy seat", image: "/images/lounge-chairs/sonet.jpg" },
    { id: 'nc29', category: 'chairs', subCategory: 'Lounge Chairs', name: "Studio", description: "Studio lounge chair with slim profile", image: "/images/lounge-chairs/studio.jpg" },
    { id: 'nc30', category: 'chairs', subCategory: 'Lounge Chairs', name: "Track", description: "Track-arm lounge with tailored finish", image: "/images/lounge-chairs/track.jpg" },
    { id: 'nc31', category: 'chairs', subCategory: 'Lounge Chairs', name: "Trend", description: "Contemporary lounge with sculpted seat", image: "/images/lounge-chairs/trend.jpg" },
    { id: 'nc32', category: 'chairs', subCategory: 'Lounge Chairs', name: "Trion", description: "Tri-leg lounge with soft shell", image: "/images/lounge-chairs/trion.jpg" },
    { id: 'nc33', category: 'chairs', subCategory: 'Lounge Chairs', name: "Weave", description: "Woven-back lounge chair with cushion", image: "/images/lounge-chairs/weave.jpg" },
    { id: 'nc5', category: 'chairs', subCategory: 'Lounge Chairs', name: "Navy Curved Back", description: "Elegant navy blue armchair with curved silhouette", image: "/images/navy-curved-back.jpg" },
    { id: 'nc6', category: 'chairs', subCategory: 'Lounge Chairs', name: "Blush Pink Tub Chair", description: "Soft pink upholstery with comfortable deep seating", image: "/images/blush-pink-tub-chair.jpg" },
    { id: 'nc7', category: 'chairs', subCategory: 'High Back', name: "Scarlet Wingback", description: "Classic high-back wing chair in bold red velvet", image: "/images/scarlet-wingback.jpg" },
    { id: 'nc8', category: 'chairs', subCategory: 'Visitor Chairs', name: "Mustard Modern Chair", description: "Yellow contemporary chair with gold base", image: "/images/mustard-modern-chair.jpg" },
    { id: 'nc9', category: 'chairs', subCategory: 'Visitor Chairs', name: "Charcoal Grey Guest", description: "Minimalist grey fabric chair for office visitors", image: "/images/9.png" },
    { id: 'nc10', category: 'chairs', subCategory: 'High Back', name: "Cognac Leather Wing", description: "Tufted high-back chair in faux leather", image: "/images/10.png" },
    { id: 'nc11', category: 'chairs', subCategory: 'High Back', name: "Emerald High Back", description: "Statement green chair with diamond stitching", image: "/images/11.png" },
    { id: 'nc12', category: 'chairs', subCategory: 'Lounge Chairs', name: "Royal Purple Lounge", description: "Plush purple seating for breakout zones", image: "/images/12.png" },

    // Tables
    { id: 't1', category: 'tables', subCategory: 'Conference Tables', name: "Rectangular Metal Frame Table", description: "Rectangular meeting table with metal frame base", image: "/Tables/rectangular-metal-frame-table.jpg" },
    { id: 't2', category: 'tables', subCategory: 'Coffee Tables', name: "Round Coffee Table", description: "Round coffee table with sleek base", image: "/Tables/round-coffee-table.jpg" },
    { id: 't3', category: 'tables', subCategory: 'Dining Tables', name: "Round White Table", description: "Minimal round white tabletop on pedestal base", image: "/Tables/round-white-table.jpg" },
    { id: 't4', category: 'tables', subCategory: 'Side Tables', name: "Side Table", description: "Compact side table for lounge setups", image: "/Tables/side-table.jpg" },
    { id: 't5', category: 'tables', subCategory: 'Utility Tables', name: "Trolley Table", description: "Mobile trolley table with storage tiers", image: "/Tables/trolley.jpg" },
    { id: 't6', category: 'tables', subCategory: 'Meeting Tables', name: "Zoom Table", description: "Contemporary meeting table with tapered legs", image: "/Tables/zoom.jpg" },
    
    // Lounge (Sofas)
    { id: 'l1', category: 'lounge', subCategory: 'Sofas', name: "3 Seater Sofa", description: "Comfortable 3-seater sofa with plush cushions", image: "/Sofa/3-seater-sofa.jpg" },
    { id: 'l2', category: 'lounge', subCategory: 'Sofas', name: "Baron Sofa", description: "Elegant sofa with tailored arms", image: "/Sofa/baron.jpg" },
    { id: 'l3', category: 'lounge', subCategory: 'Sofas', name: "Bond Sofa", description: "Modern sofa with clean lines", image: "/Sofa/bond.jpg" },
    { id: 'l4', category: 'lounge', subCategory: 'Sofas', name: "Century Sofa", description: "Timeless design with deep seating", image: "/Sofa/century.jpg" },
    { id: 'l5', category: 'lounge', subCategory: 'Sofas', name: "Fiji Sofa", description: "Relaxed silhouette for casual lounges", image: "/Sofa/fiji.jpg" },
    { id: 'l6', category: 'lounge', subCategory: 'Sofas', name: "Ines Sofa", description: "Curved profile with cozy upholstery", image: "/Sofa/ines.jpg" },
    { id: 'l7', category: 'lounge', subCategory: 'Sofas', name: "Lean Sofa", description: "Sleek sofa with angled back", image: "/Sofa/lean.jpg" },
    { id: 'l8', category: 'lounge', subCategory: 'Sofas', name: "Outline Corner Sofa", description: "Spacious corner sofa for collaborative spaces", image: "/Sofa/outline-corner-sofa.jpg" },
    { id: 'l9', category: 'lounge', subCategory: 'Sofas', name: "Maria Sofa", description: "Soft, inviting sofa with rounded edges", image: "/Sofa/maria.jpg" },
    { id: 'l10', category: 'lounge', subCategory: 'Sofas', name: "Save Sofa", description: "Compact sofa for tight layouts", image: "/Sofa/save.jpg" },
    { id: 'l11', category: 'lounge', subCategory: 'Sofas', name: "Velours Sofa", description: "Velour-upholstered sofa with luxe feel", image: "/Sofa/velours.jpg" },

    // New categories: Phone Booths (office pods) and Wooden Cafe Chairs

    // Cafe Chairs - Wooden variety
    { id: 'cc79', category: 'cafe_chairs', subCategory: 'Bistro Chairs', name: "The Parisian Bistro", description: "Modern bistro chair with elegant design", image: "/images/cafe-chairs/cafe-chair-79.png" },
    { id: 'cc80', category: 'cafe_chairs', subCategory: 'Bistro Chairs', name: "Dusk Pink Velvet Chair", description: "Contemporary cafe seating with sturdy frame", image: "/images/cafe-chairs/cafe-chair-80.png" },

    // Puffy
    { id: 'pu1', category: 'puffy', subCategory: 'Bean Bags', name: "Aop Bean Bag", description: "Cozy bean bag for casual lounges", image: "/Puffy/aop.jpg" },
    { id: 'pu2', category: 'puffy', subCategory: 'Ottomans & Poufs', name: "Canada Ottoman", description: "Structured ottoman with soft upholstery", image: "/Puffy/canada.jpg" },
    { id: 'pu3', category: 'puffy', subCategory: 'Ottomans & Poufs', name: "Lean Pouf", description: "Low-profile pouf with rounded edges", image: "/Puffy/lean.jpg" },
    { id: 'pu4', category: 'puffy', subCategory: 'Ottomans & Poufs', name: "Ottoman Burke", description: "Plush ottoman with stitched detailing", image: "/Puffy/ottoman-burke.jpg" },
    { id: 'pu5', category: 'puffy', subCategory: 'Bean Bags', name: "Puffy Seat", description: "Relaxed puffy seating for breakouts", image: "/Puffy/puffy.jpg" },
    { id: 'pu6', category: 'puffy', subCategory: 'Ottomans & Poufs', name: "Seoul Pouf", description: "Compact pouf with soft finish", image: "/Puffy/seoul.jpg" },
    { id: 'pu7', category: 'puffy', subCategory: 'Ottomans & Poufs', name: "Soho Pouf", description: "Modern pouf with clean lines", image: "/Puffy/soho.jpg" },
    { id: 'pu8', category: 'puffy', subCategory: 'Ottomans & Poufs', name: "Tablet Pouf", description: "Versatile pouf for casual seating", image: "/Puffy/tablet.jpg" },

    // Pods
    { id: 'po1', category: 'pods', subCategory: 'Work Pods', name: "Mute Pod", description: "Single-person acoustic work pod", image: "/Pods/mute.jpg" },
    { id: 'po2', category: 'pods', subCategory: 'Meeting Pods', name: "Outerline Highback Pod", description: "High-back meeting pod for teams", image: "/Pods/outerline-highback.jpg" },
    { id: 'po3', category: 'pods', subCategory: 'Phone Booths', name: "Stop Pod", description: "Private phone booth for focused calls", image: "/Pods/stop.jpg" },
    { id: 'po4', category: 'pods', subCategory: 'Phone Booths', name: "1 Seater Phone 1", description: "Single-seat phone booth for private calls", image: "/Phone_Booth/1-seater-phone-1.jpg" },
    { id: 'po5', category: 'pods', subCategory: 'Phone Booths', name: "1 Seater Phone 2", description: "Compact phone booth with modern design", image: "/Phone_Booth/1-seater-phone-2.jpg" },
    { id: 'po6', category: 'pods', subCategory: 'Phone Booths', name: "1 Seater Phone 2A", description: "Single-person phone pod variant", image: "/Phone_Booth/1-seater-phone-2a.jpg" },
    { id: 'po7', category: 'pods', subCategory: 'Phone Booths', name: "1 Seater Phone 3", description: "Acoustic single-seat phone booth", image: "/Phone_Booth/1-seater-phone-3.jpg" },
    { id: 'po8', category: 'pods', subCategory: 'Meeting Pods', name: "2 Seater Pod", description: "2-person collaborative pod", image: "/Phone_Booth/2-seater-pod.jpg" },
    { id: 'po9', category: 'pods', subCategory: 'Meeting Pods', name: "2 Seater Pod 1", description: "Compact 2-seat meeting pod", image: "/Phone_Booth/2-seater-pod-1.jpg" },
    { id: 'po10', category: 'pods', subCategory: 'Meeting Pods', name: "2 Seater Pod 2", description: "Duo meeting pod with soundproofing", image: "/Phone_Booth/2-seater-pod-2.jpg" },
    { id: 'po11', category: 'pods', subCategory: 'Meeting Pods', name: "2 Seater Pod 3", description: "2-person pod for focused meetings", image: "/Phone_Booth/2-seater-pod-3.jpg" },
    { id: 'po12', category: 'pods', subCategory: 'Meeting Pods', name: "2 Seater Pod 4", description: "Private 2-seat collaboration pod", image: "/Phone_Booth/2-seater-pod-4.jpg" },
    { id: 'po13', category: 'pods', subCategory: 'Meeting Pods', name: "2 Seater Pod 5", description: "Modern 2-seat pod with ventilation", image: "/Phone_Booth/2-seater-pod-5.jpg" },
    { id: 'po14', category: 'pods', subCategory: 'Meeting Pods', name: "2 Seater Pod 6", description: "Enclosed 2-person meeting space", image: "/Phone_Booth/2-seater-pod-6.jpg" },
    { id: 'po15', category: 'pods', subCategory: 'Meeting Pods', name: "4 Seater Pod 1", description: "4-person team meeting pod", image: "/Phone_Booth/4-seater-pod-1.jpg" },
    { id: 'po16', category: 'pods', subCategory: 'Meeting Pods', name: "4 Seater Pod 2", description: "Spacious 4-seat collaborative pod", image: "/Phone_Booth/4-seater-pod-2.jpg" },
    { id: 'po17', category: 'pods', subCategory: 'Meeting Pods', name: "4 Seater Pod 3", description: "Acoustic 4-seat meeting pod", image: "/Phone_Booth/4-seater-pod-3.jpg" },
    { id: 'po18', category: 'pods', subCategory: 'Meeting Pods', name: "4 Seater Pod 4", description: "Private 4-person meeting pod", image: "/Phone_Booth/4-seater-pod-4.jpg" },
    { id: 'po19', category: 'pods', subCategory: 'Meeting Pods', name: "4 Seater Pod 5", description: "Enclosed 4-seat workspace pod", image: "/Phone_Booth/4-seater-pod-5.jpg" },
    { id: 'po20', category: 'pods', subCategory: 'Meeting Pods', name: "6 Seater Pod 1", description: "Large 6-person meeting pod", image: "/Phone_Booth/6-seater-pod-1.jpg" },
    { id: 'po21', category: 'pods', subCategory: 'Meeting Pods', name: "6 Seater Pod 2", description: "Team room pod for 6 people", image: "/Phone_Booth/6-seater-pod-2.jpg" },
    { id: 'po22', category: 'pods', subCategory: 'Meeting Pods', name: "6 Seater Pod 3", description: "Spacious 6-seat collaborative pod", image: "/Phone_Booth/6-seater-pod-3.jpg" },
    { id: 'po23', category: 'pods', subCategory: 'Meeting Pods', name: "6 Seater Pod 4", description: "Executive 6-person meeting pod", image: "/Phone_Booth/6-seater-pod-4.jpg" },
    { id: 'po24', category: 'pods', subCategory: 'Meeting Pods', name: "6 Seater Pod 5", description: "Large team meeting space pod", image: "/Phone_Booth/6-seater-pod-5.jpg" },
    { id: 'po25', category: 'pods', subCategory: 'Meeting Pods', name: "6 Seater Pod 6", description: "Premium 6-seat enclosed pod", image: "/Phone_Booth/6-seater-pod-6.jpg" },
    { id: 'po26', category: 'pods', subCategory: 'Phone Booths', name: "Phone Pods", description: "Multi-purpose phone booth pod", image: "/Phone_Booth/phone-pods.jpg" },
    { id: 'po27', category: 'pods', subCategory: 'Work Pods', name: "General Pod", description: "Versatile work and meeting pod", image: "/Phone_Booth/pod.png" },

    // Bar Stools
    { id: 'bs1', category: 'bar_stools', subCategory: 'Metal Stools', name: "Industrial Metal Stool", description: "Adjustable height with backrest", image: "/images/bar-stools/bar-stool-2.jpg" },
    { id: 'bs2', category: 'bar_stools', subCategory: 'Designer Stools', name: "BoConcept P", description: "Sleek designer profile with sculpted seat", image: "/images/bar-stools/boconcept-p.jpg" },
    { id: 'bs3', category: 'bar_stools', subCategory: 'Upholstered Stools', name: "Combo Bar Stool", description: "Upholstered comfort with footrest support", image: "/images/bar-stools/combo.jpg" },
    { id: 'bs4', category: 'bar_stools', subCategory: 'Modern Stools', name: "Mambo Stool", description: "Modern silhouette with slim frame", image: "/images/bar-stools/mambo.jpg" },
    
    // Bar Tables
    { id: 'bt75', category: 'bar_tables', subCategory: 'High Tables', name: "The Luna Marble Bar", description: "A luxurious high table featuring a polished white stone top and a sleek cylindrical black base", image: "/images/bar-tables/bar-table-75.png" },
    { id: 'bt76', category: 'bar_tables', subCategory: 'High Tables', name: " The Bronx Industrial", description: "Contemporary industrial bar table combining a textured oak surface with a sturdy raw steel frame.", image: "/images/bar-tables/bar-table-76.png" },
    { id: 'bt77', category: 'bar_tables', subCategory: 'High Tables', name: " The Oslo Nordic Bar", description: " A minimalist Scandi-style high table crafted from smooth light ash wood with elegant tapered legs.", image: "/images/bar-tables/bar-table-77.png" },
    
    // Cafe Chairs
    
    // Cafe Tables
    { id: 'ct2', category: 'cafe_tables', subCategory: 'Dining Tables', name: "Square Oak Cafe Table", description: "Solid wood square cafe table with rounded edges", image: "/images/cafe-tables/cafe-table-82.png" },
];

export const PRODUCTS_DATA: Product[] = PRODUCTS_DATA_RAW.map(product => ({
  ...product,
  image: mediaPath(product.image)
}));
