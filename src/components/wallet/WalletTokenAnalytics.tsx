import React, { useState } from 'react';
import { WalletAsset } from '../../types/types';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, Title, DonutChart } from '@tremor/react';
import { CircleMeter } from '../CircleMeter';
import { TrendingUp, Activity, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

interface WalletTokenAnalyticsProps {
  assets: WalletAsset[];
}

export const WalletTokenAnalytics: React.FC<WalletTokenAnalyticsProps> = ({ assets }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedBlockchain, setSelectedBlockchain] = useState<'all' | 'Polygon' | 'XRPL'>('all');

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const filteredAssets = selectedBlockchain === 'all' 
    ? assets 
    : assets.filter(asset => asset.blockchain === selectedBlockchain);

  // Chain-specific metrics
  const chainMetrics = {
    Polygon: {
      assets: assets.filter(a => a.blockchain === 'Polygon'),
      totalValue: assets.filter(a => a.blockchain === 'Polygon').reduce((sum, a) => sum + a.value, 0),
      change24h: assets.filter(a => a.blockchain === 'Polygon').reduce((sum, a) => sum + (a.change24h * a.value), 0) / 
                assets.filter(a => a.blockchain === 'Polygon').reduce((sum, a) => sum + a.value, 0)
    },
    XRPL: {
      assets: assets.filter(a => a.blockchain === 'XRPL'),
      totalValue: assets.filter(a => a.blockchain === 'XRPL').reduce((sum, a) => sum + a.value, 0),
      change24h: assets.filter(a => a.blockchain === 'XRPL').reduce((sum, a) => sum + (a.change24h * a.value), 0) / 
                assets.filter(a => a.blockchain === 'XRPL').reduce((sum, a) => sum + a.value, 0)
    }
  };

  // Performance metrics
  const getMetrics = (assets: WalletAsset[]) => {
    const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
    const bestPerformer = [...assets].sort((a, b) => b.change24h - a.change24h)[0];
    const worstPerformer = [...assets].sort((a, b) => a.change24h - b.change24h)[0];
    const avgChange = assets.reduce((sum, a) => sum + a.change24h, 0) / assets.length;
    
    return {
      totalValue,
      bestPerformer,
      worstPerformer,
      avgChange,
      assetCount: assets.length,
      dominance: (totalValue / totalValue) * 100
    };
  };

  const metrics = {
    all: getMetrics(assets),
    polygon: getMetrics(chainMetrics.Polygon.assets),
    xrpl: getMetrics(chainMetrics.XRPL.assets)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Token Distribution</h2>
        <div className="flex gap-2">
          {(['all', 'Polygon', 'XRPL'] as const).map((chain) => (
            <button
              key={chain}
              onClick={() => setSelectedBlockchain(chain)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedBlockchain === chain
                  ? 'bg-primary-600 dark:bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {chain === 'all' ? 'All Chains' : chain}
            </button>
          ))}
        </div>
      </div>

      {/* Network Distribution Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <Title>Network Distribution</Title>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <DonutChart
                data={[
                  { name: 'Polygon', value: chainMetrics.Polygon.totalValue },
                  { name: 'XRPL', value: chainMetrics.XRPL.totalValue }
                ]}
                category="value"
                index="name"
                valueFormatter={formatCurrency}
                colors={['emerald', 'violet']}
                className="h-40"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400">Polygon</h4>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(chainMetrics.Polygon.totalValue)}
                </p>
                <p className={`text-sm ${
                  chainMetrics.Polygon.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {chainMetrics.Polygon.change24h >= 0 ? '+' : ''}
                  {chainMetrics.Polygon.change24h.toFixed(2)}%
                </p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400">XRPL</h4>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(chainMetrics.XRPL.totalValue)}
                </p>
                <p className={`text-sm ${
                  chainMetrics.XRPL.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {chainMetrics.XRPL.change24h >= 0 ? '+' : ''}
                  {chainMetrics.XRPL.change24h.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="dark:bg-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <Title>Performance Metrics</Title>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <CircleMeter
                value={metrics[selectedBlockchain === 'Polygon' ? 'polygon' : selectedBlockchain === 'XRPL' ? 'xrpl' : 'all'].avgChange}
                maxValue={100}
                label="Average Performance"
                color={isDark ? '#4ade80' : '#16a34a'}
                size={100}
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400">Best Performer</h4>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {metrics[selectedBlockchain === 'Polygon' ? 'polygon' : selectedBlockchain === 'XRPL' ? 'xrpl' : 'all'].bestPerformer?.symbol}
                </p>
                <p className="text-sm text-green-600">
                  +{metrics[selectedBlockchain === 'Polygon' ? 'polygon' : selectedBlockchain === 'XRPL' ? 'xrpl' : 'all'].bestPerformer?.change24h.toFixed(2)}%
                </p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400">Worst Performer</h4>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {metrics[selectedBlockchain === 'Polygon' ? 'polygon' : selectedBlockchain === 'XRPL' ? 'xrpl' : 'all'].worstPerformer?.symbol}
                </p>
                <p className="text-sm text-red-600">
                  {metrics[selectedBlockchain === 'Polygon' ? 'polygon' : selectedBlockchain === 'XRPL' ? 'xrpl' : 'all'].worstPerformer?.change24h.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Token Rankings */}
      <Card className="dark:bg-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <Title>Token Rankings</Title>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets
            .sort((a, b) => b.value - a.value)
            .slice(0, 6)
            .map((asset) => (
              <div key={asset.symbol} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{asset.symbol}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{asset.name}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    asset.blockchain === 'Polygon'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {asset.blockchain}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Value</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(asset.value)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">24h Change</p>
                    <p className={`font-medium flex items-center ${
                      asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {asset.change24h >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(asset.change24h).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};