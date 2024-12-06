import React from 'react';
import styles from './HowItWorks.module.css';

/**
 * HowItWorks Component - Explains how FinWise works
 * @component
 * @returns {JSX.Element}
 */
const HowItWorks = () => {
  const steps = [
    { step: "1", description: "Sign up for free and set up your portfolio." },
    { step: "2", description: "Choose a stock and analyze its recent trends." },
    { step: "3", description: "Get AI-powered predictions and insights." },
  ];

  return (
    <div className={styles.howItWorks}>
      <h2>How It Works</h2>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepNumber}>{step.step}</div>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
