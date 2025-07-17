import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageLoader from '../image/ImageLoader';

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  ctaText = 'Explore Gallery',
  ctaLink = '/gallery',
  className = ''
}: HeroSectionProps) {
  return (
    <section className={`relative h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageLoader
          src={backgroundImage}
          alt="Hero background"
          aspectRatio="hero"
          className="w-full h-full object-cover"
          placeholderSrc="/images/placeholders/hero-placeholder.svg"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {title.split(' ').map((word, index) => (
            <span key={index} className={index === title.split(' ').length - 1 ? 'block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' : ''}>
              {word}{index < title.split(' ').length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
        {ctaText && ctaLink && (
          <Link
            to={ctaLink}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </section>
  );
}