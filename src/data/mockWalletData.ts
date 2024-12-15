import { WalletAsset, WalletStats } from '../types/types';

export const STRATEGIC_RESERVE_WALLET = '0x18B37183Bad87852cAA2Bc5C899e176eA74E2505';

export const mockWalletAssets: WalletAsset[] = [
  // Polygon Tokens
  { 
    symbol: 'POL', 
    name: 'Polygon Token', 
    balance: 396.0,
    price: 0.62, 
    value: 245.52,
    change24h: 0.8,
    blockchain: 'Polygon'
  },
  { 
    symbol: 'MAGIC-POL', 
    name: 'Magic Token (Polygon)', 
    balance: 10000000, 
    price: 1.25, 
    value: 12500000, 
    change24h: 2.3,
    blockchain: 'Polygon'
  },
  { 
    symbol: 'MINT-POL', 
    name: 'Mint Token (Polygon)', 
    balance: 130000000, 
    price: 0.85, 
    value: 110500000, 
    change24h: 1.8,
    blockchain: 'Polygon'
  },
  { 
    symbol: 'WMATIC', 
    name: 'Wrapped Matic', 
    balance: 3.02372935, 
    price: 0.6178, 
    value: 1.87, 
    change24h: 0.5,
    blockchain: 'Polygon'
  },
  { 
    symbol: 'WETH', 
    name: 'Wrapped Ethereum', 
    balance: 0.00032601, 
    price: 3920.25, 
    value: 1.28, 
    change24h: 2.1,
    blockchain: 'Polygon'
  },
  { 
    symbol: 'USDC.e', 
    name: 'USD Coin (PoS)', 
    balance: 0.822706, 
    price: 0.9999, 
    value: 0.82, 
    change24h: 0,
    blockchain: 'Polygon'
  },
  { 
    symbol: 'USDC', 
    name: 'USD Coin', 
    balance: 0.026131, 
    price: 0.9999, 
    value: 0.03, 
    change24h: 0,
    blockchain: 'Polygon'
  },
  // XRPL Tokens
  {
    symbol: 'USDM',
    name: 'USD Mock (XRPL)',
    balance: 94000000,
    price: 1.00,
    value: 94000000,
    change24h: 0,
    blockchain: 'XRPL'
  },
  {
    symbol: 'MAGIC-XRPL',
    name: 'Magic Token (XRPL)',
    balance: 20000000,
    price: 0.15,
    value: 3000000,
    change24h: 2.5,
    blockchain: 'XRPL'
  },
  {
    symbol: 'MINT-XRPL',
    name: 'Mint Token (XRPL)',
    balance: 130000000,
    price: 0.85,
    value: 110500000,
    change24h: 1.8,
    blockchain: 'XRPL'
  },
  {
    symbol: 'WIZARD',
    name: 'Wizard Token',
    balance: 10000000,
    price: 0.25,
    value: 2500000,
    change24h: 1.8,
    blockchain: 'XRPL'
  },
  {
    symbol: 'SHAMAN',
    name: 'Shaman Token',
    balance: 5000000,
    price: 0.35,
    value: 1750000,
    change24h: 3.2,
    blockchain: 'XRPL'
  }
];

export const mockWalletStats: WalletStats = {
  totalValue: mockWalletAssets.reduce((sum, asset) => sum + asset.value, 0),
  change24h: 1.2,
  lastUpdated: new Date().toISOString()
};