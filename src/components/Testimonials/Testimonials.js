// src/components/Testimonials/Testimonials.js
import React from 'react';
import styles from './Testimonials.module.css';

/**
 * Testimonials Component - Displays user testimonials for credibility.
 * @component
 * @returns {JSX.Element}
 */
const Testimonials = () => (
  <section className={styles.testimonials}>
    <h2>What Our Users Say</h2>
    <blockquote>"FinWise has transformed my investing strategy!"</blockquote>
    <blockquote>"Smart recommendations that actually work."</blockquote>
  </section>
);

export default Testimonials;
