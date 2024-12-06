// src/pages/Homepage/Homepage.js
import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturesOverview from '../../components/FeaturesOverview/FeaturesOverview';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import { Link } from 'react-router-dom';
import styles from './Homepage.module.css';

/**
 * Homepage Component - Entry page introducing FinWise's offerings
 * @component
 * @returns {JSX.Element}
 */
const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <HeroSection 
        title="Smart Financial Insights, Powered by AI"
        subtitle="Unlock the power of FinWise for personalized financial advice and portfolio management."
        primaryCta={{ text: "Get Started", to: "/signup" }}
        secondaryCta={{ text: "Login", to: "/login" }}
      />
      
      <FeaturesOverview />
      <HowItWorks />

      <footer className={styles.footer}>
        <p>Ready to start? <Link to="/signup">Sign Up Today</Link></p>
      </footer>
    </div>
  );
};

export default Homepage;
