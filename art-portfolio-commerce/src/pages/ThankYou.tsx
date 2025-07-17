import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Mail, ArrowRight, Download } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';

interface OrderDetails {
  orderNumber: string;
  email: string;
  total: number;
  items: Array<{
    title: string;
    artist: string;
    price: number;
    quantity: number;
  }>;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  estimatedDelivery: string;
}

export default function ThankYou() {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // In a real app, this would come from the checkout process or API
    const mockOrderDetails: OrderDetails = {
      orderNumber: `AG-${Date.now().toString().slice(-6)}`,
      email: 'customer@example.com',
      total: 2400,
      items: [
        {
          title: 'Urban Serenity',
          artist: 'Maya Chen',
          price: 2400,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Art Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102'
      },
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setOrderDetails(mockOrderDetails);
  }, []);

  if (!orderDetails) {
    return (
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your order has been confirmed and is being processed. You'll receive updates via email as your artwork makes its way to you.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Confirmation</h2>
            <span className="text-sm font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full">
              #{orderDetails.orderNumber}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Details</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">by {item.artist}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">Total</span>
                    <span className="font-bold text-lg text-purple-600 dark:text-purple-400">
                      ${orderDetails.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Shipping Information</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-900 dark:text-white font-medium">{orderDetails.shippingAddress.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{orderDetails.shippingAddress.address}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                </p>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                      Estimated Delivery: {orderDetails.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">What Happens Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Confirmation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A detailed receipt has been sent to {orderDetails.email}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Careful Packaging</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your artwork will be professionally packaged for safe transport
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tracking Updates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You'll receive tracking information once your order ships
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/order-tracking"
            className="inline-flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
          >
            <Package className="w-5 h-5" />
            <span>Track Your Order</span>
          </Link>
          <button className="inline-flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
            <Download className="w-5 h-5" />
            <span>Download Receipt</span>
          </button>
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors duration-200"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Questions about your order?
          </p>
          <Link
            to="/contact"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
          >
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
}