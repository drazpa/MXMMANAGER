import React from 'react';
import { WalletAsset } from '../../../types/types';
import { formatCurrency, formatNumber } from '../../../utils/formatters';
import { BarChart3 } from 'lucide-react';

interface TokenRankingsProps {
  assets: WalletAsset[];
}

export const TokenRankings: React.FC<TokenRankingsProps> = ({ assets }) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const distributions = [
    {
      label: 'Value Distribution',
      items: assets
        .sort((a, b) => b.value - a.value)
        .map(asset => ({
          name: asset.symbol,
          value: ((asset.value / totalValue) * 100).toFixed(2),
          suffix: '%'
        }))
    },
    {
      label: 'Performance Leaders',
      items: assets
        .sort((a, b) => b.change24h - a.change24h)
        .map(asset => ({
          name: asset.symbol,
          value: asset.change24h.toFixed(2),
          suffix: '%',
          isPositive: asset.change24h >= 0
        }))
    },
    {
      label: 'Balance Rankings',
      items: assets
        .sort((a, b) => b.balance - a.balance)
        .map(asset => ({
          name: asset.symbol,
          value: formatNumber(asset.balance),
          valueRaw: asset.balance
        }))
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">Token Rankings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {distributions.map((dist, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{dist.label}</h3>
            <div className="space-y-3">
              {dist.items.slice(0, 6).map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-white">{item.name}</span>
                  <span className={`${
                    'isPositive' in item
                      ? item.isPositive ? 'text-green-400' : 'text-red-400'
                      : 'text-white'
                  }`}>
                    {item.value}{item.suffix || ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};