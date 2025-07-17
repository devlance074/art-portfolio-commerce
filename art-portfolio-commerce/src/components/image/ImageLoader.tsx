import React, { useState, useEffect, useRef } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';

export interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'hero';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: (error: Event) => void;
  showLoadingSpinner?: boolean;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[16/9]',
  hero: 'aspect-[16/6]'
};

export default function ImageLoader({
  src,
  alt,
  className = '',
  placeholderSrc,
  aspectRatio = 'portrait',
  loading = 'lazy',
  onLoad,
  onError,
  showLoadingSpinner = true
}: ImageLoaderProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(loading === 'eager');

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'lazy' && imgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [loading]);

  // Reset state when src changes
  useEffect(() => {
    setImageState('loading');
    setCurrentSrc(src);
  }, [src]);

  const handleLoad = () => {
    setImageState('loaded');
    onLoad?.();
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn(`Image failed to load: ${currentSrc}`);
    
    if (placeholderSrc && currentSrc !== placeholderSrc) {
      console.log(`Attempting fallback: ${placeholderSrc}`);
      setCurrentSrc(placeholderSrc);
      setImageState('loading');
    } else {
      setImageState('error');
      onError?.(event.nativeEvent);
    }
  };

  const baseClasses = `
    w-full h-full object-cover transition-all duration-300
    ${aspectRatioClasses[aspectRatio]}
    ${className}
  `;

  // Error state
  if (imageState === 'error') {
    return (
      <div className={`${baseClasses} bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
        <div className="text-center text-gray-400 dark:text-gray-500">
          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden`}>
      {/* Loading placeholder */}
      {imageState === 'loading' && showLoadingSpinner && (
        <div className={`absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${baseClasses}`}>
          <div className="text-center text-gray-400 dark:text-gray-500">
            <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
            <p className="text-xs">Loading...</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`${baseClasses} ${
            imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
        />
      )}
    </div>
  );
}