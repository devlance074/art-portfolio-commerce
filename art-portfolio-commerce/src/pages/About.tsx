import React from 'react';
import { Heart, Eye, Users, Award } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';

export default function About() {
  const stats = [
    { icon: Eye, label: 'Artworks', value: '500+' },
    { icon: Users, label: 'Artists', value: '150+' },
    { icon: Heart, label: 'Art Lovers', value: '10K+' },
    { icon: Award, label: 'Exhibitions', value: '25+' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Curator',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Art historian with 15 years of experience in contemporary art curation.'
    },
    {
      name: 'Michael Chen',
      role: 'Gallery Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Former museum director passionate about promoting emerging artists.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Artist Relations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Connecting artists with collectors and fostering creative communities.'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920&h=600&fit=crop&crop=center)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-pink-900/60" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Passionate about art, dedicated to artists, committed to excellence
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                At Artisan Gallery, we believe that art has the power to transform perspectives, inspire creativity, and connect people across cultures. Our mission is to provide a platform where artists can share their vision with the world and where art lovers can discover pieces that speak to their souls.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We are committed to supporting both emerging and established artists by offering them exposure, resources, and opportunities to grow their careers. Through carefully curated exhibitions and personalized service, we strive to make art accessible and meaningful to everyone.
              </p>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=1000&fit=crop&crop=center"
                alt="Gallery interior"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
                onError={(error) => {
                  console.error('Failed to load gallery interior image:', error);
                }}
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We seek out unique perspectives and innovative approaches to contemporary art, always looking for fresh voices and bold creativity.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Passion</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our love for art drives everything we do. We are passionate about connecting people with artworks that inspire and move them.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Community</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We foster a supportive community where artists, collectors, and art enthusiasts can connect and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The passionate individuals behind Artisan Gallery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative inline-block">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                    loading="lazy"
                    onError={(error) => {
                      console.error(`Failed to load team member image for ${member.name}:`, error);
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}