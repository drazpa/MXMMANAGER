import React from 'react';
import { CircleMeter } from './CircleMeter';
import { WalletAsset } from '../types/types';
import { formatCurrency } from '../utils/formatters';
import { Activity, TrendingUp, PieChart, BarChart3 } from 'lucide-react';

interface PortfolioMetricsProps {
  assets: WalletAsset[];
}

export const PortfolioMetrics: React.FC<PortfolioMetricsProps> = ({ assets }) => {
  // Calculate real-time metrics
  const calculatePortfolioHealth = () => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const positivePerformers = assets.filter(asset => asset.change24h > 0).length;
    const healthScore = (positivePerformers / assets.length) * 100;
    return Math.min(Math.max(healthScore, 0), 100);
  };

  const calculateRiskLevel = () => {
    const volatility = assets.reduce((sum, asset) => sum + Math.abs(asset.change24h), 0) / assets.length;
    const riskScore = (volatility / 10) * 100; // Normalize to 0-100
    return Math.min(Math.max(riskScore, 0), 100);
  };

  const calculateDiversification = () => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const weights = assets.map(asset => (asset.value / totalValue) ** 2);
    const concentration = weights.reduce((sum, weight) => sum + weight, 0);
    return Math.min(Math.max((1 - concentration) * 100, 0), 100);
  };

  const calculateLiquidityScore = () => {
    const stablecoins = assets.filter(asset => 
      ['USDC', 'USDT', 'USDM'].includes(asset.symbol)
    ).reduce((sum, asset) => sum + asset.value, 0);
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    return Math.min(Math.max((stablecoins / totalValue) * 100, 0), 100);
  };

  const metrics = [
    {
      label: 'Portfolio Health',
      value: calculatePortfolioHealth(),
      icon: <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      color: '#4ade80',
      description: 'Overall portfolio stability and growth'
    },
    {
      label: 'Risk Level',
      value: calculateRiskLevel(),
      icon: <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      color: '#f59e0b',
      description: 'Portfolio volatility assessment'
    },
    {
      label: 'Diversification',
      value: calculateDiversification(),
      icon: <PieChart className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      color: '#8b5cf6',
      description: 'Asset distribution score'
    },
    {
      label: 'Liquidity Score',
      value: calculateLiquidityScore(),
      icon: <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
      color: '#3b82f6',
      description: 'Portfolio liquidity assessment'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
          <div className="card-content">
            <div className="flex items-center justify-between mb-4">
              {metric.icon}
              <span className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</span>
            </div>
            <CircleMeter
              value={metric.value}
              maxValue={100}
              label={metric.description}
              color={metric.color}
              size={120}
            />
          </div>
        </div>
      ))}
    </div>
  );
};