import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-surface border border-border cursor-pointer">
      <img 
        src={project.image} 
        alt={project.name}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block px-3 py-1 mb-3 text-[10px] uppercase tracking-widest font-bold text-black bg-primary rounded-full">
          {project.category}
        </span>
        <h3 className="text-xl font-medium text-white mb-1">{project.name}</h3>
        <p className="text-sm text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {project.description}
        </p>
      </div>
    </div>
  );
};
