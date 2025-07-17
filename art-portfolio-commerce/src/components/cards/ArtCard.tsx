import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import ImageLoader from '../image/ImageLoader';

export interface ArtCardProps {
  id: number;
  title: string;
  artist: string;
  image: string;
  category: string;
  year: string;
  price: number;
  onView: (id: number) => void;
  onAddToCart: (artwork: any) => void;
  className?: string;
}

export default function ArtCard({
  id,
  title,
  artist,
  image,
  category,
  year,
  price,
  onView,
  onAddToCart,
  className = ''
}: ArtCardProps) {
  const handleView = () => {
    onView(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      id,
      title,
      artist,
      image,
      price,
      category
    });
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
          aspectRatio="portrait"
          className="group-hover:scale-110 transition-transform duration-700"
          placeholderSrc="/images/placeholders/art-card-placeholder.svg"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-block px-3 py-1 bg-purple-500/80 rounded-full text-xs font-semibold mb-2">
              {category}
            </span>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-gray-200 text-sm mb-2">by {artist}</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300 text-sm">{year}</span>
              <span className="text-white font-semibold">${price.toLocaleString()}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleView}
                className="flex-1 bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-purple-600/80 backdrop-blur-sm text-white py-2 rounded-lg hover:bg-purple-700/80 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static Info */}
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-semibold mb-3">
          {category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">by {artist}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-500 dark:text-gray-500 text-sm">{year}</span>
          <span className="text-gray-900 dark:text-white font-semibold">${price.toLocaleString()}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}