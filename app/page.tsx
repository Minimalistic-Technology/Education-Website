import React from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Features from './components/features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default App;