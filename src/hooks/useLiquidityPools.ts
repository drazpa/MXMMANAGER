import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { UNISWAP_V2_PAIR_ABI } from '../constants/abis';

const POLYGON_RPC = 'https://polygon-rpc.com';
const provider = new ethers.JsonRpcProvider(POLYGON_RPC);

// Pool addresses for MINT and MAGIC pairs
const POOL_ADDRESSES = {
  'MINT-USDC': '0x...',  // Replace with actual pool address
  'MINT-WMATIC': '0x...', // Replace with actual pool address
  'MAGIC-USDC': '0x...', // Replace with actual pool address
  'MAGIC-WMATIC': '0x...' // Replace with actual pool address
};

interface PoolData {
  token0: string;
  token1: string;
  totalLiquidity: number;
  volume24h: number;
  apr: number;
  userLiquidity?: number;
  poolShare?: number;
}

const fetchPoolData = async (address: string, userAddress: string): Promise<PoolData> => {
  const contract = new ethers.Contract(address, UNISWAP_V2_PAIR_ABI, provider);
  
  const [
    reserves,
    token0,
    token1,
    totalSupply,
    userBalance
  ] = await Promise.all([
    contract.getReserves(),
    contract.token0(),
    contract.token1(),
    contract.totalSupply(),
    contract.balanceOf(userAddress)
  ]);

  // Calculate metrics
  const totalLiquidity = parseFloat(ethers.formatEther(reserves[0])) * 2; // Simplified calculation
  const volume24h = totalLiquidity * 0.05; // Estimated daily volume
  const apr = (volume24h * 365 * 0.003) / totalLiquidity * 100; // Estimated APR based on fees
  const userLiquidity = parseFloat(ethers.formatEther(userBalance));
  const poolShare = (userLiquidity / parseFloat(ethers.formatEther(totalSupply))) * 100;

  return {
    token0: await getTokenSymbol(token0),
    token1: await getTokenSymbol(token1),
    totalLiquidity,
    volume24h,
    apr,
    userLiquidity,
    poolShare
  };
};

const getTokenSymbol = async (address: string): Promise<string> => {
  const contract = new ethers.Contract(
    address,
    ['function symbol() view returns (string)'],
    provider
  );
  return await contract.symbol();
};

export const useLiquidityPools = (userAddress: string) => {
  return useQuery({
    queryKey: ['liquidityPools', userAddress],
    queryFn: async () => {
      const poolsData = await Promise.all(
        Object.entries(POOL_ADDRESSES).map(async ([pairName, address]) => {
          const data = await fetchPoolData(address, userAddress);
          return { ...data, pairName };
        })
      );
      return poolsData;
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });
};