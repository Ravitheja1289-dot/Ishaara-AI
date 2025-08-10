import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import DemoSection from './components/sections/DemoSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
      <Navbar />
      <main>
        <HeroSection />
        <DemoSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;