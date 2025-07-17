import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import ArtPreview from './pages/ArtPreview';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import OrderTracking from './pages/OrderTracking';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <Cart />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/artpreview/:artId" element={<ArtPreview />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/order-tracking" element={<OrderTracking />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;