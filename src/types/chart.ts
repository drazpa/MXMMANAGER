export type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';

export interface TimeRangeOption {
  value: TimeRange;
  label: string;
  interval: 'hour' | 'day' | 'week' | 'month' | 'year';
  format: string;
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
  volume?: number;
}