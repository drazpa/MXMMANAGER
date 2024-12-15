import React, { useState } from 'react';
import { UserWalletInput } from '../components/UserWalletInput';
import { WalletMonitor } from '../components/WalletMonitor';
import { MXMStats } from '../components/MXMStats';
import { PriceChart } from '../components/PriceChart';
import { getPriceHistory } from '../data/mockData';
import { TimeRange } from '../types/types';

export const UserWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');

  const mxmState = {
    totalSupply: 10000000,
    price: 0.10,
    reserveRatio: 0.85,
    circulatingSupply: 8500000,
    marketCap: 850000,
    backed: 100
  };

  const priceData = getPriceHistory(timeRange);

  const handleWalletSubmit = (address: string) => {
    setWalletAddress(address);
  };

  return (
    <div className="space-y-6">
      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Monitor Any Wallet
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Enter a wallet address to view its holdings, performance, and analytics across Polygon and XRPL networks.
          </p>
          <UserWalletInput onSubmit={handleWalletSubmit} />
        </div>
      </div>

      {walletAddress && (
        <div className="space-y-6">
          <MXMStats mxmState={mxmState} />
          <PriceChart 
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            data={priceData.map(d => ({
              timestamp: d.timestamp,
              price: d.price,
              volume: d.volume
            }))}
          />
          <WalletMonitor address={walletAddress} />
        </div>
      )}
    </div>
  );
};