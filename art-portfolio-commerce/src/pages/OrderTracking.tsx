import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../components/ImageWithFallback';

interface TrackingEvent {
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
}

interface OrderInfo {
  orderNumber: string;
  status: 'processing' | 'shipped' | 'in-transit' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
  shippingAddress: string;
  items: Array<{
    title: string;
    artist: string;
    image: string;
    price: number;
  }>;
  trackingEvents: TrackingEvent[];
}

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mockOrderInfo: OrderInfo = {
    orderNumber: 'AG-123456',
    status: 'in-transit',
    trackingNumber: 'TRK789012345',
    estimatedDelivery: 'Friday, January 12, 2025',
    shippingAddress: '123 Art Street, San Francisco, CA 94102',
    items: [
      {
        title: 'Urban Serenity',
        artist: 'Maya Chen',
        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 2400
      }
    ],
    trackingEvents: [
      {
        date: 'Jan 8, 2025',
        time: '2:30 PM',
        status: 'In Transit',
        location: 'Oakland, CA',
        description: 'Package is on the way to the next facility'
      },
      {
        date: 'Jan 7, 2025',
        time: '11:45 AM',
        status: 'Shipped',
        location: 'San Francisco, CA',
        description: 'Package has been picked up and is on its way'
      },
      {
        date: 'Jan 6, 2025',
        time: '3:15 PM',
        status: 'Processing',
        location: 'Artisan Gallery',
        description: 'Order is being carefully packaged'
      },
      {
        date: 'Jan 5, 2025',
        time: '10:20 AM',
        status: 'Confirmed',
        location: 'Artisan Gallery',
        description: 'Order confirmed and payment processed'
      }
    ]
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (orderNumber.toLowerCase().includes('ag-123456') || orderNumber === '123456') {
      setOrderInfo(mockOrderInfo);
    } else {
      setError('Order not found. Please check your order number and try again.');
      setOrderInfo(null);
    }

    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'shipped':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'in transit':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'delivered':
        return 'text-green-600 dark:text-green-400';
      case 'processing':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'shipped':
        return 'text-blue-600 dark:text-blue-400';
      case 'in-transit':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Enter your order number to see the latest updates on your artwork delivery
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., AG-123456)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Don't have your order number?
            </p>
            <Link
              to="/contact"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold text-sm"
            >
              Contact our support team
            </Link>
          </div>
        </div>

        {/* Order Information */}
        {orderInfo && (
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>
                <span className="text-sm font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full">
                  #{orderInfo.orderNumber}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Items Ordered</h3>
                  <div className="space-y-4">
                    {orderInfo.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(error) => {
                            console.error(`Failed to load order tracking item image for ${item.title}:`, error);
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">by {item.artist}</p>
                          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                            ${item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Delivery Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{orderInfo.shippingAddress}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Tracking: {orderInfo.trackingNumber}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Estimated Delivery: {orderInfo.estimatedDelivery}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Tracking History</h2>
              <div className="space-y-6">
                {orderInfo.trackingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(event.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${getStatusColor(event.status)}`}>
                          {event.status}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
              >
                <span>Contact Support</span>
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        )}

        {/* Demo Information */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Demo Information</h3>
          <p className="text-sm text-blue-800 dark:text-blue-400">
            Try tracking with order number: <span className="font-mono font-semibold">AG-123456</span> or <span className="font-mono font-semibold">123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}