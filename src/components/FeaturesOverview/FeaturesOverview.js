import React from 'react';
import styles from './FeaturesOverview.module.css';

/**
 * FeaturesOverview Component - Lists main features of FinWise
 * @component
 * @returns {JSX.Element}
 */
const FeaturesOverview = () => {
  const features = [
    { title: "Personalized Risk Assessment", description: "Understand your financial risks and take calculated actions." },
    { title: "Portfolio Insights", description: "Manage and optimize your investments effortlessly." },
    { title: "Stock Predictions", description: "Get AI-powered predictions for smarter trading." },
  ];

  return (
    <div className={styles.features}>
      <h2>Why Choose FinWise?</h2>
      <div className={styles.featureList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesOverview;
