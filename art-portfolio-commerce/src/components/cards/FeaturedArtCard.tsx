import React from 'react';
import { ArrowRight } from 'lucide-react';
import ImageLoader from '../image/ImageLoader';

export interface FeaturedArtCardProps {
  id: number;
  title: string;
  artist: string;
  image: string;
  category: string;
  price: number;
  onView: (id: number) => void;
  className?: string;
}

export default function FeaturedArtCard({
  id,
  title,
  artist,
  image,
  category,
  price,
  onView,
  className = ''
}: FeaturedArtCardProps) {
  const handleView = () => {
    onView(id);
  };

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 
        shadow-lg hover:shadow-2xl transition-all duration-500 
        transform hover:-translate-y-2 cursor-pointer
        ${className}
      `}
      onClick={handleView}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <ImageLoader
          src={image}
          alt={`${title} by ${artist}`}
          aspectRatio="square"
          className="group-hover:scale-110 transition-transform duration-700"
          placeholderSrc="/images/placeholders/product-placeholder.svg"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-block px-3 py-1 bg-purple-500/80 rounded-full text-xs font-semibold mb-2">
              {category}
            </span>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-gray-200">by {artist}</p>
            <div className="flex justify-between items-center mt-3">
              <p className="text-lg font-semibold">${price.toLocaleString()}</p>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Static Info */}
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-semibold mb-3">
          {category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">by {artist}</p>
        <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mt-2">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}