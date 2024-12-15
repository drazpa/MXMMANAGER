import { TimeRange, TimeRangeOption } from '../types/types';

export const TIME_RANGE_OPTIONS: Record<TimeRange, TimeRangeOption> = {
  '1D': {
    value: '1D',
    label: '24H',
    interval: 'hour',
    format: 'HH:mm'
  },
  '1W': {
    value: '1W',
    label: '7D',
    interval: 'day',
    format: 'MMM DD'
  },
  '1M': {
    value: '1M',
    label: '30D',
    interval: 'day',
    format: 'MMM DD'
  },
  '3M': {
    value: '3M',
    label: '90D',
    interval: 'week',
    format: 'MMM DD'
  },
  '6M': {
    value: '6M',
    label: '180D',
    interval: 'month',
    format: 'MMM YYYY'
  },
  '1Y': {
    value: '1Y',
    label: '1Y',
    interval: 'month',
    format: 'MMM YYYY'
  },
  'ALL': {
    value: 'ALL',
    label: 'ALL',
    interval: 'year',
    format: 'YYYY'
  }
};

export const formatChartDate = (timestamp: string, timeRange: TimeRange): string => {
  const date = new Date(timestamp);
  const options = TIME_RANGE_OPTIONS[timeRange];
  
  if (timeRange === '1D') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: timeRange === '1Y' || timeRange === 'ALL' ? 'numeric' : undefined
  });
};

export const generateTimeSeriesData = (timeRange: TimeRange, baseValue: number) => {
  const now = new Date();
  const data = [];
  const volatility = 0.02; // 2% volatility
  
  const intervals = {
    '1D': 24,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    'ALL': 730
  };

  const points = intervals[timeRange];
  let currentValue = baseValue;

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    
    switch (timeRange) {
      case '1D':
        date.setHours(date.getHours() - i);
        break;
      default:
        date.setDate(date.getDate() - i);
    }

    // Add some randomness to the value
    const change = (Math.random() - 0.5) * volatility;
    currentValue = currentValue * (1 + change);

    data.push({
      timestamp: date.toISOString(),
      value: currentValue,
      volume: Math.random() * 1000000
    });
  }

  return data;
};