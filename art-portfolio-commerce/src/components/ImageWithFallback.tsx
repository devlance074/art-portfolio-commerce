import React, { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: (error: Event) => void;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=1000&fit=crop&crop=center',
  onError,
  loading = 'lazy',
  style,
  onClick
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn(`Image failed to load: ${currentSrc}`);
    setHasError(true);
    setIsLoading(false);
    
    if (currentSrc !== fallbackSrc) {
      console.log(`Attempting fallback image: ${fallbackSrc}`);
      setCurrentSrc(fallbackSrc);
    } else {
      console.error(`Fallback image also failed to load: ${fallbackSrc}`);
    }
    
    if (onError) {
      onError(event.nativeEvent);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  if (hasError && currentSrc === fallbackSrc) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
        style={style}
        onClick={onClick}
      >
        <div className="text-center text-gray-400 dark:text-gray-500">
          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
          style={style}
        >
          <div className="text-gray-400 dark:text-gray-500">
            <ImageIcon className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading}
        style={style}
        onClick={onClick}
      />
    </div>
  );
}