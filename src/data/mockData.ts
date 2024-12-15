import { TimeRange } from '../types/types';

const generatePriceData = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    
    // Start with base price of $0.10
    const basePrice = 0.10;
    // Create more realistic price movements around $0.10
    const trend = Math.sin(i / (days / 4)) * 0.02; // Smaller oscillation (±$0.02)
    const volatility = Math.random() * 0.01 - 0.005; // Daily volatility (±$0.005)
    const price = basePrice + trend + volatility;
    
    return {
      timestamp: date.toISOString().split('T')[0],
      price: Math.max(0.08, price), // Ensure price doesn't go below $0.08
      volume: 500000 + Math.random() * 1000000
    };
  });
};

export const getPriceHistory = (timeRange: TimeRange) => {
  const ranges: Record<TimeRange, number> = {
    '1D': 24,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    'ALL': 365 * 2
  };

  return generatePriceData(ranges[timeRange]);
};