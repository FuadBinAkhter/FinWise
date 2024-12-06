import Papa from 'papaparse';

/**
 * Fetches the recent sequence of closing prices from a local CSV file.
 * @param {string} stockSymbol - The stock symbol (e.g., "AAPL", "TSLA").
 * @returns {Promise<number[]>} - A promise resolving to the last 60 closing prices.
 */
const fetchRecentSequenceFromCSV = async (stockSymbol) => {
  try {
    // Construct the file path dynamically based on the stock symbol
    const filePath = `/data/${stockSymbol}.csv`; // Assuming CSV files are in the "public/data" folder

    // Fetch the CSV file content
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file for ${stockSymbol}: ${response.statusText}`);
    }
    const csvText = await response.text();

    // Parse the CSV content using PapaParse
    const { data, errors } = Papa.parse(csvText, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      throw new Error(`Error parsing CSV file for ${stockSymbol}: ${errors[0].message}`);
    }

    // Ensure "Close" column exists and extract its values
    if (!data[0] || !data[0][' Close']) {
      throw new Error('The "Close" column is missing in the CSV file.');
    }

    // Parse the closing prices from the "Close" column
    const closingPrices = data.map((row) => parseFloat(row[' Close']));

    // Ensure the file contains enough data
    if (closingPrices.length >= 60) {
      // Take the last 60 closing prices
      return closingPrices.slice(-60);
    } else {
      throw new Error(`Not enough data in the ${stockSymbol}.csv file to create a sequence.`);
    }
  } catch (error) {
    console.error(`Error reading CSV file for ${stockSymbol}:`, error);
    return null;
  }
};

export default fetchRecentSequenceFromCSV;
