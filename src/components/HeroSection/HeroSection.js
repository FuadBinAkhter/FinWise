import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

/**
 * HeroSection Component - Displays the homepage hero banner
 * @component
 * @param {Object} props
 * @param {string} props.title - Main heading text
 * @param {string} props.subtitle - Subheading text
 * @param {Object} props.primaryCta - Primary Call-To-Action { text, to }
 * @param {Object} props.secondaryCta - Secondary Call-To-Action { text, to }
 * @returns {JSX.Element}
 */
const HeroSection = ({ title, subtitle, primaryCta, secondaryCta }) => {
  return (
    <div className={styles.hero}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className={styles.cta}>
        <Link to={primaryCta.to} className={styles.primaryButton}>
          {primaryCta.text}
        </Link>
        <Link to={secondaryCta.to} className={styles.secondaryButton}>
          {secondaryCta.text}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
