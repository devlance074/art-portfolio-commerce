import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ImageWithFallback from '../components/ImageWithFallback';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 1000 ? 0 : 150;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <Link
            to="/gallery"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <Link
            to="/gallery"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                1
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            <div className={`h-px flex-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-2 mb-6">
                  <Lock className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Secure Payment</h2>
                </div>
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(error) => {
                        console.error(`Failed to load checkout item image for ${item.title}:`, error);
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">by {item.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        ${item.price.toLocaleString()}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-white">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-purple-600 dark:text-purple-400">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-green-700 dark:text-green-400 text-sm font-medium">
                    🎉 Free shipping on orders over $1,000!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}