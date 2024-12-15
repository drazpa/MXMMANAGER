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