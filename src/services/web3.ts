import { ethers } from 'ethers';
import type { WalletData } from '../types/types';
import { mockWalletAssets, mockWalletStats, STRATEGIC_RESERVE_WALLET } from '../data/mockWalletData';

// Polygon RPC URL
const POLYGON_RPC = 'https://polygon-rpc.com';
const provider = new ethers.JsonRpcProvider(POLYGON_RPC);

// ERC20 ABI (minimal for balanceOf and decimals)
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

// Token contract addresses on Polygon
const TOKEN_ADDRESSES = {
  MINT: '0xAbfDC2A4adC15EB8Ee414BB3Cbb512A3ee11811E',
  MAGIC: '0x457535b9A90ED7cbE26b6CeB88b192Ee64bc928c',
  POL: '0x0000000000000000000000000000000000001010'
};

const getTokenBalance = async (tokenAddress: string, walletAddress: string): Promise<{
  balance: number;
  symbol: string;
}> => {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const [balance, decimals, symbol] = await Promise.all([
      contract.balanceOf(walletAddress),
      contract.decimals(),
      contract.symbol()
    ]);
    return {
      balance: Number(ethers.formatUnits(balance, decimals)),
      symbol
    };
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return { balance: 0, symbol: '' };
  }
};

export const getWalletData = async (address: string): Promise<WalletData> => {
  try {
    // If it's the strategic reserve wallet, return the mock data
    if (address.toLowerCase() === STRATEGIC_RESERVE_WALLET.toLowerCase()) {
      return {
        assets: mockWalletAssets,
        stats: mockWalletStats
      };
    }

    // For other wallets, fetch real balances
    const nativeBalance = await provider.getBalance(address);
    const polBalance = Number(ethers.formatEther(nativeBalance));

    // Get token balances
    const [mintData, magicData] = await Promise.all([
      getTokenBalance(TOKEN_ADDRESSES.MINT, address),
      getTokenBalance(TOKEN_ADDRESSES.MAGIC, address)
    ]);

    // Create custom assets array for the wallet
    const assets = [
      {
        symbol: 'POL',
        name: 'Polygon Token',
        balance: polBalance,
        price: 0.62,
        value: polBalance * 0.62,
        change24h: 0.8,
        blockchain: 'Polygon' as const
      },
      {
        symbol: 'MINT-POL',
        name: 'Mint Token (Polygon)',
        balance: mintData.balance,
        price: 0.85,
        value: mintData.balance * 0.85,
        change24h: 1.8,
        blockchain: 'Polygon' as const
      },
      {
        symbol: 'MAGIC-POL',
        name: 'Magic Token (Polygon)',
        balance: magicData.balance,
        price: 1.25,
        value: magicData.balance * 1.25,
        change24h: 2.3,
        blockchain: 'Polygon' as const
      }
    ].filter(asset => asset.balance > 0);

    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

    return {
      assets,
      stats: {
        totalValue,
        change24h: 1.2,
        lastUpdated: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw new Error('Failed to fetch wallet data');
  }
};