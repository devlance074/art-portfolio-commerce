import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ZoomIn, Share2, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { getArtworkById, getRelatedArtworks } from '../data/artworks';
import ImageWithFallback from '../components/ImageWithFallback';

export default function ArtPreview() {
  const { artId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const artwork = getArtworkById(parseInt(artId || '1'));
  const relatedArtworks = artwork ? getRelatedArtworks(artwork.id, artwork.category) : [];

  useEffect(() => {
    if (artwork) {
      setIsLoading(false);
    } else {
      // Redirect to gallery if artwork not found
      navigate('/gallery');
    }
  }, [artwork, navigate]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!artwork) return;
      
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setIsZoomed(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [artwork]);

  if (isLoading || !artwork) {
    return (
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % artwork.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + artwork.images.length) % artwork.images.length);
  };

  const handleAddToCart = () => {
    addToCart({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      image: artwork.images[0],
      price: artwork.price,
      category: artwork.category
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${artwork.title} by ${artwork.artist}`,
          text: artwork.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleRelatedArtworkClick = (relatedId: number) => {
    navigate(`/artpreview/${relatedId}`);
    setCurrentImageIndex(0);
    setIsZoomed(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/gallery" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
              Gallery
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white">{artwork.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <ImageWithFallback
                src={artwork.images[currentImageIndex]}
                alt={`${artwork.title} - Image ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
                loading="eager"
                onError={(error) => {
                  console.error(`Failed to load main artwork image ${currentImageIndex + 1} for ${artwork.title}:`, error);
                }}
              />
              
              {/* Navigation Arrows */}
              {artwork.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-900 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-900 transition-colors duration-200"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {artwork.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {artwork.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      index === currentImageIndex
                        ? 'border-purple-500'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(error) => {
                        console.error(`Failed to load thumbnail ${index + 1} for ${artwork.title}:`, error);
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Image Counter */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              {currentImageIndex + 1} of {artwork.images.length}
            </div>
          </div>

          {/* Artwork Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
                {artwork.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {artwork.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                by {artwork.artist}
              </p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-6">
                ${artwork.price.toLocaleString()}
              </p>
            </div>

            {/* Artwork Info */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Medium</h3>
                <p className="text-gray-600 dark:text-gray-400">{artwork.medium}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Dimensions</h3>
                <p className="text-gray-600 dark:text-gray-400">{artwork.dimensions}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Year</h3>
                <p className="text-gray-600 dark:text-gray-400">{artwork.year}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Edition</h3>
                <p className="text-gray-600 dark:text-gray-400">{artwork.edition}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Artist Bio */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About the Artist</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {artwork.artistBio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>✓ Certificate of authenticity included</p>
              <p>✓ Secure packaging and insured shipping</p>
              <p>✓ 30-day return policy</p>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Artworks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArtworks.map((related) => (
                <button
                  key={related.id}
                  onClick={() => handleRelatedArtworkClick(related.id)}
                  className="group block text-left"
                >
                  <div className="aspect-square overflow-hidden rounded-xl mb-4">
                    <ImageWithFallback
                      src={related.images[0]}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(error) => {
                        console.error(`Failed to load related artwork image for ${related.title}:`, error);
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{related.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">by {related.artist}</p>
                  <p className="font-bold text-purple-600 dark:text-purple-400">${related.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}