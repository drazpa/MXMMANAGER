import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { Droplets, Loader } from 'lucide-react';
import { useLiquidityPools } from '../../hooks/useLiquidityPools';
import { STRATEGIC_RESERVE_WALLET } from '../../data/mockWalletData';

export const LiquidityPools: React.FC = () => {
  const { data: pools, isLoading, error } = useLiquidityPools(STRATEGIC_RESERVE_WALLET);

  if (isLoading) {
    return (
      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content text-center py-12 text-red-600 dark:text-red-400">
          Error loading liquidity pool data
        </div>
      </div>
    );
  }

  if (!pools?.length) {
    return null;
  }

  const totalValueLocked = pools.reduce((sum, pool) => sum + pool.totalLiquidity, 0);
  const totalVolume = pools.reduce((sum, pool) => sum + pool.volume24h, 0);
  const totalUserLiquidity = pools.reduce((sum, pool) => sum + (pool.userLiquidity || 0), 0);

  return (
    <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
      <div className="card-content">
        <div className="flex items-center gap-2 mb-6">
          <Droplets className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Polygon Liquidity Pools</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pool</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Liquidity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">APR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Your Liquidity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pool Share</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {pools.map((pool, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {pool.token0}/{pool.token1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatCurrency(pool.totalLiquidity)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatCurrency(pool.volume24h)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {pool.apr.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatCurrency(pool.userLiquidity || 0)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {pool.poolShare?.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Value Locked</h3>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalValueLocked)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">24h Total Volume</h3>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalVolume)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Your Total Liquidity</h3>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalUserLiquidity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};