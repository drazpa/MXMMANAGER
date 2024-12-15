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

export type Blockchain = 'Polygon' | 'XRPL';

export interface WalletAsset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  value: number;
  change24h: number;
  blockchain: Blockchain;
  isFavorite?: boolean;
}

export interface WalletStats {
  totalValue: number;
  change24h: number;
  lastUpdated: string;
}

export interface WalletData {
  assets: WalletAsset[];
  stats: WalletStats;
}

export interface MXMState {
  totalSupply: number;
  price: number;
  reserveRatio: number;
  circulatingSupply: number;
  marketCap: number;
  backed: number;
}

export interface ReserveAsset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  weight: number;
}