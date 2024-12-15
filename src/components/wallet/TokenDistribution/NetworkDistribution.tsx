import React from 'react';
import { CircleMeter } from '../../CircleMeter';
import { formatCurrency } from '../../../utils/formatters';
import { NetworkMetrics } from '../../../types/wallet';
import { Layers } from 'lucide-react';

interface NetworkDistributionProps {
  chainMetrics: {
    Polygon: NetworkMetrics;
    XRPL: NetworkMetrics;
  };
}

export const NetworkDistribution: React.FC<NetworkDistributionProps> = ({ chainMetrics }) => {
  const totalValue = Object.values(chainMetrics).reduce((sum, chain) => sum + chain.totalValue, 0);

  return (
    <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
      <div className="card-content">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-xl font-semibold text-white">Network Distribution</h2>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {Object.entries(chainMetrics).map(([network, metrics]) => {
            const percentage = (metrics.totalValue / totalValue) * 100;
            return (
              <div key={network} className="flex flex-col items-center">
                <CircleMeter
                  value={percentage}
                  maxValue={100}
                  label={network}
                  color={network === 'Polygon' ? '#8b5cf6' : '#3b82f6'}
                  size={120}
                />
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(metrics.totalValue)}
                  </p>
                  <p className={`text-sm ${
                    metrics.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metrics.change24h >= 0 ? '+' : ''}{metrics.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};