import React from 'react';
import { MXMStats } from '../components/MXMStats';
import { PriceChart } from '../components/PriceChart';
import { WalletMonitor } from '../components/WalletMonitor';
import { STRATEGIC_RESERVE_WALLET } from '../data/mockWalletData';

export const StrategicReserve: React.FC = () => {
  // Initial MXM state with base values
  const mxmState = {
    totalSupply: 10000000,
    price: 0.10,
    reserveRatio: 0.85,
    circulatingSupply: 8500000,
    marketCap: 850000,
    backed: 100
  };

  return (
    <div className="space-y-6">
      <MXMStats mxmState={mxmState} />
      <PriceChart 
        timeRange="1D"
        onTimeRangeChange={() => {}}
        data={[]}
      />
      <WalletMonitor address={STRATEGIC_RESERVE_WALLET} />
    </div>
  );
};