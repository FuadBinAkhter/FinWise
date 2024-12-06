const API_KEY = 'BFIKZRCPN8FA74NO'; // Replace with your API key

const fetchRecentSequenceFromAlphaVantage = async (stockSymbol) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data['Time Series (1min)']) {
      // Extract closing prices
      const prices = Object.values(data['Time Series (1min)']).map(entry => parseFloat(entry['4. close']));

      // Take the last 60 prices
      if (prices.length >= 60) {
        return prices.slice(0, 60); // Return exactly 60 recent prices
      } else {
        throw new Error("Not enough data to create a sequence.");
      }
    } else if (data['Note']) {
      throw new Error("API call frequency exceeded. Please wait.");
    } else {
      throw new Error("Unexpected response structure from Alpha Vantage.");
    }
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage:", error);
    return null;
  }
};

export default fetchRecentSequenceFromAlphaVantage;
