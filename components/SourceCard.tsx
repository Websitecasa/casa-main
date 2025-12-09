import React from 'react';
import { Product } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface SourceCardProps {
  doc: Product;
  onClick?: () => void;
}

export const SourceCard: React.FC<SourceCardProps> = ({ doc, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group flex flex-col rounded-xl bg-surface border border-border hover:border-primary/50 hover:bg-surfaceHighlight transition-all cursor-pointer w-56 shrink-0 snap-center overflow-hidden"
    >
      {/* Product Image */}
      <div className="h-32 w-full overflow-hidden relative">
        <img 
          src={doc.image} 
          alt={doc.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          {CATEGORY_ICONS[doc.category]}
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1">
        <h4 className="text-sm text-text font-medium truncate">{doc.name}</h4>
        <p className="text-[11px] text-textMuted line-clamp-2 leading-relaxed h-8">
          {doc.description}
        </p>
        
        <div className="mt-2 pt-2 border-t border-white/5 flex justify-end items-center">
          <span className="text-[10px] text-textMuted/60 uppercase tracking-wider">{doc.category}</span>
        </div>
      </div>
    </div>
  );
};