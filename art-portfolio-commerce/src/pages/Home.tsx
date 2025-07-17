import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';
import { artworks } from '../data/artworks';
import HeroSection from '../components/sections/HeroSection';
import FeaturedArtCard from '../components/cards/FeaturedArtCard';
import ImageLoader from '../components/image/ImageLoader';

export default function Home() {
  const navigate = useNavigate();
  
  const featuredArtworks = artworks.slice(0, 6);

  const handleArtworkClick = (artworkId: number) => {
    navigate(`/artpreview/${artworkId}`);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Where Art Meets Innovation"
        subtitle="Discover contemporary masterpieces from emerging and established artists in our curated digital gallery."
        backgroundImage="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop&crop=center"
      />

      {/* Featured Artworks Gallery */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Artworks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A carefully curated selection of our most captivating pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
              <FeaturedArtCard
                key={artwork.id}
                id={artwork.id}
                title={artwork.title}
                artist={artwork.artist}
                image={artwork.images[0]}
                category={artwork.category}
                price={artwork.price}
                onView={handleArtworkClick}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/gallery')}
              className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors duration-200"
            >
              <span>View All Artworks</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Artist Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                <Star className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Featured Artist</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Maya Chen
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Maya Chen is a contemporary abstract artist whose vibrant compositions explore the intersection of urban life and natural beauty. Based in San Francisco, her work has been featured in galleries across North America and Europe.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Through bold color palettes and dynamic brushstrokes, Maya creates emotional landscapes that invite viewers to discover their own stories within each piece.
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleArtworkClick(1)}
                  className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors duration-200"
                >
                  <span>View Portfolio</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-semibold transition-colors duration-200"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <ImageLoader
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&crop=center"
                  alt="Maya Chen - Featured Artist"
                  aspectRatio="portrait"
                  placeholderSrc="/images/placeholders/profile-placeholder.svg"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 -z-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}