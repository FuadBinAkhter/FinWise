import fetchRecentSequenceFromCSV from './fetchRecentSequenceFromCSV';

describe('fetchRecentSequenceFromCSV', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if the CSV file is missing the "Close" column', async () => {
    const mockCsvText = `
      Open,High,Low,Volume
      225.67,226.78,223.45,47923699
    `.trim();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockCsvText,
    });

    const result = await fetchRecentSequenceFromCSV('AAPL');
    expect(result).toBeNull();
  });

  it('should throw an error if there is not enough data in the CSV file', async () => {
    const mockCsvText = `
      Close
      225.67
      226.78
    `.trim();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockCsvText,
    });

    const result = await fetchRecentSequenceFromCSV('AAPL');
    expect(result).toBeNull();
  });

  it('should handle network errors gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    const result = await fetchRecentSequenceFromCSV('AAPL');
    expect(result).toBeNull();
  });
});
