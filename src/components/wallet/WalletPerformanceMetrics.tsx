import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/reserveCalculations';

interface PerformanceMetrics {
  dailyChange: number;
  weeklyChange: number;
  monthlyChange: number;
  dailyVolume: number;
  averageVolume: number;
}

interface WalletPerformanceMetricsProps {
  metrics: PerformanceMetrics;
}

export const WalletPerformanceMetrics: React.FC<WalletPerformanceMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">24h Change</span>
            </div>
            <p className={`text-lg font-semibold ${
              metrics.dailyChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {metrics.dailyChange >= 0 ? '+' : ''}{metrics.dailyChange.toFixed(2)}%
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">7d Change</span>
            </div>
            <p className={`text-lg font-semibold ${
              metrics.weeklyChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {metrics.weeklyChange >= 0 ? '+' : ''}{metrics.weeklyChange.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">24h Volume</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(metrics.dailyVolume)}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg Volume (7d)</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(metrics.averageVolume)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};