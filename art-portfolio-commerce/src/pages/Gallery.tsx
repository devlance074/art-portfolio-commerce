import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { artworks } from '../data/artworks';
import HeroSection from '../components/sections/HeroSection';
import ArtCard from '../components/cards/ArtCard';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const categories = ['All', 'Abstract', 'Digital Art', 'Photography', 'Contemporary', 'Minimalism', 'Sculpture'];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = selectedCategory === 'All' || artwork.category === selectedCategory;
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (artwork: any) => {
    addToCart({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      image: artwork.image,
      price: artwork.price,
      category: artwork.category
    });
  };

  const handleArtworkClick = async (artworkId: number) => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 300));
    navigate(`/artpreview/${artworkId}`);
    setIsLoading(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection
        title="Discover Art"
        subtitle="Explore our curated collection of contemporary masterpieces"
        backgroundImage="https://images.unsplash.com/photo-1549490349-8643362247b5?w=1920&h=600&fit=crop&crop=center"
        ctaText=""
        ctaLink=""
        className="h-96"
      />

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search artworks or artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArtworks.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No artworks found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredArtworks.map((artwork) => (
                  <ArtCard
                    key={artwork.id}
                    id={artwork.id}
                    title={artwork.title}
                    artist={artwork.artist}
                    image={artwork.images[0]}
                    category={artwork.category}
                    year={artwork.year}
                    price={artwork.price}
                    onView={handleArtworkClick}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}
    </div>
  );
}