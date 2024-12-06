import { render, screen, waitFor } from '@testing-library/react';
import StockPrediction from './StockPrediction';
import fetchRecentSequenceFromCSV from '../utils/fetchRecentSequenceFromCSV';

// Mock the fetchRecentSequenceFromCSV utility function
jest.mock('../utils/fetchRecentSequenceFromCSV');

describe('StockPrediction Component', () => {
  it('should display loading state and then render the fetched sequence', async () => {
    const mockSequence = [225.67, 226.78, 229.52];

    // Mock the resolved value for fetchRecentSequenceFromCSV
    fetchRecentSequenceFromCSV.mockResolvedValue(mockSequence);

    // Render the StockPrediction component
    render(<StockPrediction stockSymbol="AAPL" />);

    // Verify the loading state is displayed
    expect(screen.getByText(/loading data/i)).toBeInTheDocument();

    // Wait for the sequence to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText(/recent sequence/i)).toBeInTheDocument();
      expect(screen.getByText(mockSequence.join(', '))).toBeInTheDocument();
    });
  });

  it('should handle errors gracefully', async () => {
    // Mock a rejected promise for fetchRecentSequenceFromCSV
    fetchRecentSequenceFromCSV.mockRejectedValue(new Error('Failed to fetch data'));

    // Render the StockPrediction component
    render(<StockPrediction stockSymbol="AAPL" />);

    // Verify the loading state is displayed
    expect(screen.getByText(/loading data/i)).toBeInTheDocument();

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch sequence/i)).toBeInTheDocument();
    });
  });
});
