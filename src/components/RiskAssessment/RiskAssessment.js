// src/components/RiskAssessment/RiskAssessment.js
import React from 'react';
import styles from './RiskAssessment.module.css';

/**
 * RiskAssessment Component
 * @param {string} stock - Selected stock symbol.
 * @param {number} score - Risk score (0-100).
 * @param {function} onInvest - Callback for the Invest button click.
 * @returns {JSX.Element}
 */
const RiskAssessment = ({ stock, score, onInvest }) => {
  const getRiskMessage = (score) => {
    if (score > 23) {
      return 'High Risk: You should consider reducing exposure or diversifying your portfolio.';
    } else if (score > 21) {
      return 'Moderate Risk: Requires active monitoring and careful management.';
    } else {
      return 'Low Risk: A stable investment with low volatility.';
    }
  };

  const getRiskColor = (score) => {
    if (score > 23) return '#FF6B6B'; // High risk (red)
    if (score > 22) return '#FFD93D'; // Moderate risk (yellow)
    return '#6BCB77'; // Low risk (green)
  };

  const handleClick = () => {
    if (onInvest) onInvest(stock);
  };

  return (
    <div
      className={styles.riskAssessmentCard}
      style={{ borderColor: getRiskColor(score) }}
    >
      <h2>Risk Assessment</h2>
      <p><strong>Stock:</strong> {stock}</p>
      <p>
        <strong>Risk Score:</strong>{' '}
        <span style={{ color: getRiskColor(score) }}>{score.toFixed(2)}</span>
      </p>
      <p>{getRiskMessage(score)}</p>
      <button
        className={styles.investButton}
        onClick={handleClick}
        style={{
          backgroundColor: getRiskColor(score),
          borderColor: getRiskColor(score),
        }}
      >
        Invest
      </button>
    </div>
  );
};

export default RiskAssessment;
