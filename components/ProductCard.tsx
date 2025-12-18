
import React from 'react';
import { Product } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative flex flex-col rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-surfaceHighlight transition-all duration-300 overflow-hidden h-full">
      {/* Image Container */}
      <div className="aspect-[4/3] w-full overflow-hidden relative bg-white/5 backdrop-blur-sm">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.onerror = null;
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect fill="%23222222" width="100%" height="100%"/><text x="50%" y="50%" fill="%23bbbbbb" font-family="Arial" font-size="24" text-anchor="middle" dominant-baseline="middle">Image%20not%20available</text></svg>';
          }}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
        />
        {/* Category Icon Badge */}
        <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-primary shadow-lg">
          {CATEGORY_ICONS[product.category]}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex-1 space-y-2">
           <h3 className="text-lg font-medium text-text group-hover:text-primary transition-colors line-clamp-1">
             {product.name}
           </h3>
           <p className="text-sm text-textMuted line-clamp-2 leading-relaxed">
             {product.description}
           </p>
        </div>
        
        <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
          <span className="text-[10px] font-medium uppercase tracking-widest text-textMuted/60">
            {product.category.replace('_', ' ')}
          </span>
          <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-white uppercase tracking-wider transition-colors">
            Enquire <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
