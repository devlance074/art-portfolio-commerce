export interface Artwork {
  id: number;
  title: string;
  artist: string;
  images: string[];
  category: string;
  year: string;
  price: number;
  medium: string;
  dimensions: string;
  description: string;
  artistBio: string;
  tags: string[];
  inStock: boolean;
  edition: string;
  certificate: boolean;
}

export const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Urban Serenity',
    artist: 'Maya Chen',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=1500&fit=crop&crop=center',
    ],
    category: 'Abstract',
    year: '2024',
    price: 2400,
    medium: 'Acrylic on Canvas',
    dimensions: '36" x 48"',
    description: 'Urban Serenity captures the peaceful moments found within the bustling energy of city life. Through bold brushstrokes and a harmonious color palette, this piece invites viewers to discover tranquility amidst urban chaos.',
    artistBio: 'Maya Chen is a contemporary abstract artist whose vibrant compositions explore the intersection of urban life and natural beauty. Based in San Francisco, her work has been featured in galleries across North America and Europe.',
    tags: ['abstract', 'urban', 'contemporary', 'colorful'],
    inStock: true,
    edition: 'Original',
    certificate: true
  },
  {
    id: 2,
    title: 'Digital Dreams',
    artist: 'Alex Rivera',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=1500&fit=crop&crop=center',
    ],
    category: 'Digital Art',
    year: '2024',
    price: 1800,
    medium: 'Digital Print',
    dimensions: '24" x 36"',
    description: 'Digital Dreams explores the intersection of technology and imagination, creating ethereal landscapes that exist only in the digital realm.',
    artistBio: 'Alex Rivera is a digital artist pushing the boundaries of contemporary art through innovative use of technology and digital media.',
    tags: ['digital', 'contemporary', 'technology'],
    inStock: true,
    edition: 'Limited Edition (50)',
    certificate: true
  },
  {
    id: 3,
    title: 'Nature\'s Whisper',
    artist: 'Sophie Laurent',
    images: [
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=1500&fit=crop&crop=center',
    ],
    category: 'Photography',
    year: '2023',
    price: 1200,
    medium: 'Fine Art Print',
    dimensions: '20" x 30"',
    description: 'Nature\'s Whisper captures the delicate beauty of natural landscapes through masterful photography and composition.',
    artistBio: 'Sophie Laurent is a nature photographer known for her ability to capture the sublime beauty of the natural world.',
    tags: ['photography', 'nature', 'landscape'],
    inStock: true,
    edition: 'Limited Edition (100)',
    certificate: true
  },
  {
    id: 4,
    title: 'Geometric Harmony',
    artist: 'David Kim',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=1500&fit=crop&crop=center',
    ],
    category: 'Contemporary',
    year: '2024',
    price: 3200,
    medium: 'Mixed Media',
    dimensions: '48" x 60"',
    description: 'Geometric Harmony explores the relationship between mathematical precision and artistic expression.',
    artistBio: 'David Kim is a contemporary artist known for his geometric compositions and innovative use of mixed media.',
    tags: ['geometric', 'contemporary', 'mixed-media'],
    inStock: true,
    edition: 'Original',
    certificate: true
  },
  {
    id: 5,
    title: 'Color Symphony',
    artist: 'Elena Rossi',
    images: [
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=1500&fit=crop&crop=center',
    ],
    category: 'Abstract',
    year: '2023',
    price: 2800,
    medium: 'Oil on Canvas',
    dimensions: '40" x 50"',
    description: 'Color Symphony is a vibrant exploration of color theory and emotional expression through abstract painting.',
    artistBio: 'Elena Rossi is an abstract painter whose work explores the emotional power of color and form.',
    tags: ['abstract', 'colorful', 'oil-painting'],
    inStock: true,
    edition: 'Original',
    certificate: true
  },
  {
    id: 6,
    title: 'Minimalist Beauty',
    artist: 'James Wilson',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=1500&fit=crop&crop=center',
    ],
    category: 'Minimalism',
    year: '2024',
    price: 1600,
    medium: 'Watercolor',
    dimensions: '18" x 24"',
    description: 'Minimalist Beauty demonstrates the power of simplicity and restraint in artistic expression.',
    artistBio: 'James Wilson is a minimalist artist who finds beauty in simplicity and negative space.',
    tags: ['minimalism', 'watercolor', 'simple'],
    inStock: true,
    edition: 'Limited Edition (75)',
    certificate: true
  },
  {
    id: 7,
    title: 'Steel and Light',
    artist: 'Maria Rodriguez',
    images: [
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=1500&fit=crop&crop=center',
    ],
    category: 'Sculpture',
    year: '2024',
    price: 4500,
    medium: 'Steel Sculpture',
    dimensions: '24" x 18" x 12"',
    description: 'Steel and Light explores the interplay between industrial materials and natural illumination.',
    artistBio: 'Maria Rodriguez is a sculptor known for her innovative use of industrial materials in fine art.',
    tags: ['sculpture', 'steel', 'industrial'],
    inStock: true,
    edition: 'Original',
    certificate: true
  },
  {
    id: 8,
    title: 'Ocean Depths',
    artist: 'Thomas Anderson',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&h=1500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=1500&fit=crop&crop=center',
    ],
    category: 'Photography',
    year: '2023',
    price: 1400,
    medium: 'Fine Art Print',
    dimensions: '24" x 32"',
    description: 'Ocean Depths captures the mysterious beauty of underwater landscapes and marine life.',
    artistBio: 'Thomas Anderson is an underwater photographer specializing in marine conservation through art.',
    tags: ['photography', 'ocean', 'marine'],
    inStock: true,
    edition: 'Limited Edition (60)',
    certificate: true
  }
];

export const getArtworkById = (id: number): Artwork | undefined => {
  return artworks.find(artwork => artwork.id === id);
};

export const getRelatedArtworks = (currentId: number, category: string, limit: number = 3): Artwork[] => {
  return artworks
    .filter(artwork => artwork.id !== currentId && artwork.category === category)
    .slice(0, limit);
};