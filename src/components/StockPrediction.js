import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fetchRecentSequenceFromAlphaVantage from '../utils/fetchStockData';
import fetchRecentSequenceFromCSV from '../utils/fetchRecentSequenceFromCSV';

const StockPrediction = ({ stockSymbol }) => {
  const [recentSequence, setRecentSequence] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndPredict = async () => {
      if (!stockSymbol) {
        console.warn("No stock symbol selected.");
        return;
      }

      setLoading(true);
      console.log(`Fetching data for ${stockSymbol}...`);

      try {
        // Fetch recent sequence from Alpha Vantage
        const sequence = await fetchRecentSequenceFromCSV(stockSymbol);
        console.log("Fetched sequence:", sequence);

        if (!sequence) {
          console.error("Failed to fetch a valid sequence.");
          setLoading(false);
          return;
        }

        setRecentSequence(sequence);

        // Send sequence to Flask API for prediction
        const response = await axios.post('http://127.0.0.1:5000/predict', {
          recent_sequence: sequence,
        });
        console.log("Prediction from Flask:", response.data);

        setPredictionData(response.data);
      } catch (error) {
        console.error("Error during prediction process:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndPredict();
  }, [stockSymbol]);

  return (
    <div>
      <h2>Prediction for {stockSymbol}</h2>
      {loading ? (
        <p>Loading prediction...</p>
      ) : predictionData ? (
        <div>
          <p>Predicted Price for next day: ${predictionData.predicted_price.toFixed(2)}</p>
        </div>
      ) : (
        <p>Failed to fetch prediction. Please try again later.</p>
      )}
    </div>
  );
};

export default StockPrediction;
