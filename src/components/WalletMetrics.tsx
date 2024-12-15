import React from 'react';
import { WalletAsset } from '../types/types';
import { formatCurrency, formatNumber } from '../utils/reserveCalculations';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface WalletMetricsProps {
  assets: WalletAsset[];
}

export const WalletMetrics: React.FC<WalletMetricsProps> = ({ assets }) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const bestPerformer = [...assets].sort((a, b) => b.change24h - a.change24h)[0];
  const worstPerformer = [...assets].sort((a, b) => a.change24h - b.change24h)[0];
  const largestHolding = [...assets].sort((a, b) => b.value - a.value)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <PieChart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Largest Holding</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Asset</span>
            <span className="font-medium text-gray-900 dark:text-white">{largestHolding.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Balance</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatNumber(largestHolding.balance)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Value</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(largestHolding.value)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">% of Portfolio</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {((largestHolding.value / totalValue) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Best Performer (24h)</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Asset</span>
            <span className="font-medium text-gray-900 dark:text-white">{bestPerformer.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Change</span>
            <span className="font-medium text-green-600 dark:text-green-400">
              +{bestPerformer.change24h.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Current Price</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(bestPerformer.price)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Value</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(bestPerformer.value)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Distribution</h3>
        </div>
        <div className="space-y-3">
          {assets.map(asset => (
            <div key={asset.symbol} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{asset.symbol}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {((asset.value / totalValue) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 dark:bg-primary-400 h-2 rounded-full"
                  style={{ width: `${(asset.value / totalValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};