import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import ImageWithFallback from '../components/ImageWithFallback';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, isOpen, toggleCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
            <button
              onClick={toggleCart}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty</p>
                <Link
                  to="/gallery"
                  onClick={toggleCart}
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Browse Gallery
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(error) => {
                        console.error(`Failed to load cart item image for ${item.title}:`, error);
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">by {item.artist}</p>
                      <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={toggleCart}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center block"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}