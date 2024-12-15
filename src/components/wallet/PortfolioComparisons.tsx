import React from 'react';
import { WalletAsset } from '../../types/types';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/formatters';
import { Card, Title, BarList } from '@tremor/react';
import { TrendingUp, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface PortfolioComparisonsProps {
  assets: WalletAsset[];
}

export const PortfolioComparisons: React.FC<PortfolioComparisonsProps> = ({ assets }) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  // Calculate various comparison metrics
  const comparisons = [
    {
      title: 'Value Distribution',
      data: assets.map(asset => ({
        name: asset.symbol,
        value: (asset.value / totalValue) * 100,
        icon: () => <PieChart className="w-4 h-4 text-gray-900 dark:text-white" />,
      })).sort((a, b) => b.value - a.value).slice(0, 6)
    },
    {
      title: 'Performance Leaders',
      data: assets.map(asset => ({
        name: asset.symbol,
        value: asset.change24h,
        icon: () => asset.change24h >= 0 ? 
          <ArrowUpRight className="w-4 h-4 text-gray-900 dark:text-white" /> : 
          <ArrowDownRight className="w-4 h-4 text-gray-900 dark:text-white" />,
      })).sort((a, b) => b.value - a.value).slice(0, 6)
    },
    {
      title: 'Balance Rankings',
      data: assets.map(asset => ({
        name: asset.symbol,
        value: asset.balance,
        icon: () => <BarChart3 className="w-4 h-4 text-gray-900 dark:text-white" />,
        valueFormatter: formatNumber,
      })).sort((a, b) => b.value - a.value).slice(0, 6)
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {comparisons.map((comparison, index) => (
        <Card key={index} className="dark:bg-gray-800">
          <Title className="text-gray-900 dark:text-white">{comparison.title}</Title>
          <BarList
            data={comparison.data}
            className="mt-4"
            valueFormatter={comparison.data[0].valueFormatter || ((value: number) => `${value.toFixed(2)}%`)}
          />
        </Card>
      ))}
    </div>
  );
};