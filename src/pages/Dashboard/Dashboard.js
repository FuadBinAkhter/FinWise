// src/pages/Dashboard/Dashboard.js
import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import StockPrediction from '../../components/StockPrediction';
import fetchRecentSequenceFromCSV from '../../utils/fetchRecentSequenceFromCSV';
import RiskAssessment from '../../components/RiskAssessment/RiskAssessment';

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [recentSequence, setRecentSequence] = useState(null);
  const [riskScore, setRiskScore] = useState(null);
  const [portfolio, setPortfolio] = useState([]); // Start with an empty portfolio

  const stockOptions = [
    { label: 'Apple (AAPL)', value: 'AAPL' },
    { label: 'Microsoft (MSFT)', value: 'MSFT' },
    { label: 'Tesla (TSLA)', value: 'TSLA' },
    { label: 'Amazon (AMZN)', value: 'AMZN' },
    { label: 'Walgreens (WBA)', value: 'WBA'},
  ];

  const handleStockChange = async (e) => {
    const stockSymbol = e.target.value;
    setSelectedStock(stockSymbol);

    if (stockSymbol) {
      try {
        const sequence = await fetchRecentSequenceFromCSV(stockSymbol);
        if (sequence) {
          setRecentSequence(sequence);

          // Backend call to fetch risk score
          const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recent_sequence: sequence }),
          });

          const data = await response.json();

          if (response.ok) {
            setRiskScore(data.risk_score);
          } else {
            console.error('Error fetching risk score:', data.error);
            setRiskScore(null);
          }
        } else {
          console.error('Failed to fetch stock data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleInvest = (stock) => {
    const existingStock = portfolio.find((item) => item.stock === stock);

    if (existingStock) {
      // Update quantity for existing stock
      setPortfolio((prev) =>
        prev.map((item) =>
          item.stock === stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new stock to portfolio
      const newStock = { stock, quantity: 1, averagePrice: 100 }; // Mock average price
      setPortfolio((prev) => [...prev, newStock]);
    }
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Stock Prediction Dashboard</h1>
      </header>

      <div className={styles.content}>
        {/* Stock Selector Section */}
        <div className={styles.stockSelector}>
          <label htmlFor="stock-select">Select a Stock:</label>
          <select id="stock-select" onChange={handleStockChange}>
            <option value="">--Choose a Stock--</option>
            {stockOptions.map((stock) => (
              <option key={stock.value} value={stock.value}>
                {stock.label}
              </option>
            ))}
          </select>
        </div>

        {/* Risk Assessment Section */}
        {selectedStock && riskScore !== null && (
          <div className={styles.riskAssessmentContainer}>
            <RiskAssessment
              stock={selectedStock}
              score={riskScore}
              onInvest={() => handleInvest(selectedStock)} // Pass the Invest handler
            />
          </div>
        )}

        {/* Portfolio Section */}
        <div className={styles.portfolio}>
          <h2>Your Portfolio</h2>
          {portfolio.length === 0 ? (
            <p>No investments yet. Start by selecting a stock and investing!</p>
          ) : (
            <div className={styles.portfolioGrid}>
              {portfolio.map((item, index) => (
                <div className={styles.portfolioCard} key={index}>
                  <h3>{item.stock}</h3>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Average Price:</strong> ${item.averagePrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stock Prediction Section */}
        {selectedStock && recentSequence && (
          <div className={styles.predictionContainer}>
            <StockPrediction stockSymbol={selectedStock} recentSequence={recentSequence} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
