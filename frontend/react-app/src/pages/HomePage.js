import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Partners from '../components/Partners';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Partners />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
