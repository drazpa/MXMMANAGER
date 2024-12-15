import React, { useState } from 'react';
import { NetworkDistribution } from './NetworkDistribution';
import { TokenRankings } from './TokenRankings';
import { WalletAsset } from '../../../types/types';

interface TokenDistributionProps {
  assets: WalletAsset[];
}

export const TokenDistribution: React.FC<TokenDistributionProps> = ({ assets }) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<'all' | 'Polygon' | 'XRPL'>('all');

  const chainMetrics = {
    Polygon: {
      assets: assets.filter(a => a.blockchain === 'Polygon'),
      totalValue: assets.filter(a => a.blockchain === 'Polygon')
        .reduce((sum, a) => sum + a.value, 0),
      change24h: assets.filter(a => a.blockchain === 'Polygon')
        .reduce((sum, a) => sum + (a.change24h * a.value), 0) / 
        assets.filter(a => a.blockchain === 'Polygon')
        .reduce((sum, a) => sum + a.value, 0)
    },
    XRPL: {
      assets: assets.filter(a => a.blockchain === 'XRPL'),
      totalValue: assets.filter(a => a.blockchain === 'XRPL')
        .reduce((sum, a) => sum + a.value, 0),
      change24h: assets.filter(a => a.blockchain === 'XRPL')
        .reduce((sum, a) => sum + (a.change24h * a.value), 0) / 
        assets.filter(a => a.blockchain === 'XRPL')
        .reduce((sum, a) => sum + a.value, 0)
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NetworkDistribution chainMetrics={chainMetrics} />
        <TokenRankings 
          assets={assets}
          selectedBlockchain={selectedBlockchain}
        />
      </div>
    </div>
  );
}