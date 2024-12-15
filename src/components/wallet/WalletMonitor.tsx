import React from 'react';
import { useWalletData } from '../hooks/useWalletData';
import { WalletTokenList } from './wallet/WalletTokenList';
import { WalletHistoricalValue } from './wallet/WalletHistoricalValue';
import { WalletPerformanceMetrics } from './wallet/WalletPerformanceMetrics';
import { WalletTokenAnalytics } from './wallet/WalletTokenAnalytics';
import { PortfolioMetrics } from './PortfolioMetrics';
import { PortfolioAnalytics } from './wallet/PortfolioAnalytics';
import { NFTGallery } from './wallet/NFTGallery';
import { PortfolioAnalysis } from './wallet/PortfolioAnalysis';

interface WalletMonitorProps {
  address: string;
}

export const WalletMonitor: React.FC<WalletMonitorProps> = ({ address }) => {
  const { data, isLoading, error } = useWalletData(address);

  if (isLoading) {
    return <div className="text-center py-8">Loading wallet data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading wallet data. Please try again later.</div>;
  }

  if (!data) {
    return null;
  }

  const { assets, stats } = data;

  return (
    <div className="space-y-6 mb-8">
      <PortfolioMetrics assets={assets} />
      
      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content">
          <PortfolioAnalytics assets={assets} />
        </div>
      </div>

      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content">
          <PortfolioAnalysis assets={assets} />
        </div>
      </div>

      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content">
          <WalletTokenList assets={assets} />
        </div>
      </div>

      <NFTGallery walletAddress={address} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
          <div className="card-content">
            <WalletHistoricalValue initialValue={stats.totalValue} />
          </div>
        </div>
        <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
          <div className="card-content">
            <WalletPerformanceMetrics metrics={{
              dailyChange: stats.change24h,
              weeklyChange: 2.5,
              monthlyChange: 5.8,
              dailyVolume: 1500000,
              averageVolume: 2000000
            }} />
          </div>
        </div>
      </div>

      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content">
          <WalletTokenAnalytics assets={assets} />
        </div>
      </div>
    </div>
  );
};