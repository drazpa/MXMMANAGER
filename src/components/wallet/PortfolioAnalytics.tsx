import React from 'react';
import { WalletAsset } from '../../types/types';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { Card, Title, BarList } from '@tremor/react';
import { CircleMeter } from '../CircleMeter';
import { TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight, Activity, PieChart } from 'lucide-react';

interface PortfolioAnalyticsProps {
  assets: WalletAsset[];
}

export const PortfolioAnalytics: React.FC<PortfolioAnalyticsProps> = ({ assets }) => {
  // Filter out stablecoins
  const nonStableAssets = assets.filter(asset => 
    !['USDC', 'USDT', 'USDM'].includes(asset.symbol)
  );

  // Calculate portfolio metrics
  const totalValue = nonStableAssets.reduce((sum, asset) => sum + asset.value, 0);
  const marketCap = nonStableAssets.reduce((sum, asset) => sum + (asset.price * asset.balance), 0);
  const dailyVolume = nonStableAssets.reduce((sum, asset) => sum + (asset.value * 0.15), 0);

  const portfolioMetrics = [
    {
      title: "Portfolio Overview",
      metrics: [
        {
          label: "Total Portfolio Value",
          value: formatCurrency(totalValue),
          icon: <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
          change: "+8.5%"
        },
        {
          label: "Market Capitalization",
          value: formatCurrency(marketCap),
          icon: <PieChart className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
          change: "+6.2%"
        },
        {
          label: "24h Trading Volume",
          value: formatCurrency(dailyVolume),
          icon: <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
          change: "+12.3%"
        },
        {
          label: "Total Assets",
          value: formatNumber(nonStableAssets.length),
          icon: <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
          change: "No change"
        }
      ]
    }
  ];

  // Chain distribution
  const chainDistribution = {
    Polygon: {
      assets: nonStableAssets.filter(a => a.blockchain === 'Polygon'),
      change: '+1.07%'
    },
    XRPL: {
      assets: nonStableAssets.filter(a => a.blockchain === 'XRPL'),
      change: '+1.86%'
    }
  };

  const getChainValue = (chain: 'Polygon' | 'XRPL') => 
    chainDistribution[chain].assets.reduce((sum, asset) => sum + asset.value, 0);

  const polygonValue = getChainValue('Polygon');
  const xrplValue = getChainValue('XRPL');
  const totalChainValue = polygonValue + xrplValue;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioMetrics[0].metrics.map((metric, idx) => (
          <div key={idx} className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
            <div className="card-content">
              <div className="flex items-center justify-between mb-2">
                {metric.icon}
                <span className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
          <div className="card-content">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Chain Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Polygon Network</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {((polygonValue / totalChainValue) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 dark:bg-primary-400 h-2 rounded-full"
                    style={{ width: `${(polygonValue / totalChainValue) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-green-600 dark:text-green-400">
                    {chainDistribution.Polygon.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCurrency(polygonValue)}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">XRPL Network</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {((xrplValue / totalChainValue) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 dark:bg-primary-400 h-2 rounded-full"
                    style={{ width: `${(xrplValue / totalChainValue) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-green-600 dark:text-green-400">
                    {chainDistribution.XRPL.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCurrency(xrplValue)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
          <div className="card-content">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Asset Type Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Crypto Assets</span>
                  <span className="text-sm text-gray-900 dark:text-white">65.80%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 dark:bg-primary-400 h-2 rounded-full"
                    style={{ width: '65.80%' }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-green-600 dark:text-green-400">+2.3%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    All non-stablecoin tokens
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};