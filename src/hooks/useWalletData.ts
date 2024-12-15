import { useQuery } from '@tanstack/react-query';
import { getWalletData } from '../services/web3';
import type { WalletData } from '../types/types';

export const useWalletData = (address: string) => {
  return useQuery<WalletData>({
    queryKey: ['walletData', address],
    queryFn: () => getWalletData(address),
    refetchInterval: 30000 // Refetch every 30 seconds
  });
};