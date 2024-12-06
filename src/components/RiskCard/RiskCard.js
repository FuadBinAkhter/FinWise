import React from 'react';
import styles from './RiskCard.module.css';

/**
 * RiskCard Component - Displays individual risk assessment cards
 * @component
 * @param {string} title - Card title
 * @param {string} description - Description text
 * @param {boolean} isCritical - Highlights the card if critical
 * @returns {JSX.Element}
 */
const RiskCard = ({ title, description, isCritical }) => {
  return (
    <div className={`${styles.card} ${isCritical ? styles.critical : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default RiskCard;
