import React from 'react';
import { Instagram, Twitter, Facebook, Mail, Palette } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: 'mailto:info@devlance', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Artisan Gallery
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Discover contemporary art through our curated gallery featuring emerging and established artists from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                Home
              </a>
              <a href="/gallery" className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                Gallery
              </a>
              <a href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                About
              </a>
              <a href="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h3>
            <div className="space-y-2">
              <a 
                href="mailto:info@devlance" 
                className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                info@devlance
              </a>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Artisan Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}