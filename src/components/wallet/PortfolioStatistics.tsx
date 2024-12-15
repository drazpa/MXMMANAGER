import React from 'react';
import { WalletAsset } from '../../types/types';
import { Card, Title } from '@tremor/react';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/formatters';
import { CircleMeter } from '../CircleMeter';

interface PortfolioStatisticsProps {
  assets: WalletAsset[];
}

export const PortfolioStatistics: React.FC<PortfolioStatisticsProps> = ({ assets }) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const polygonAssets = assets.filter(a => a.blockchain === 'Polygon');
  const xrplAssets = assets.filter(a => a.blockchain === 'XRPL');

  // Calculate portfolio metrics
  const metrics = [
    {
      value: calculatePortfolioHealth(assets),
      label: 'Portfolio Health',
      description: 'Overall portfolio stability and growth',
      color: '#4ade80'
    },
    {
      value: calculateDiversificationScore(assets),
      label: 'Diversification',
      description: 'Asset distribution across chains',
      color: '#8b5cf6'
    },
    {
      value: calculateRiskScore(assets),
      label: 'Risk Level',
      description: 'Portfolio risk assessment',
      color: '#f59e0b'
    },
    {
      value: calculatePerformanceScore(assets),
      label: 'Performance',
      description: '30-day performance metric',
      color: '#3b82f6'
    }
  ];

  const distributions = [
    {
      label: 'Value Distribution',
      items: [
        {
          name: 'MINT-XRPL',
          value: 40.21,
        },
        {
          name: 'USDM',
          value: 34.20,
        },
        {
          name: 'MINT-POL',
          value: 21.33,
        },
        {
          name: 'MAGIC-POL',
          value: 1.62,
        },
        {
          name: 'MAGIC-XRPL',
          value: 1.09,
        },
        {
          name: 'WIZARD',
          value: 0.91,
        }
      ]
    },
    {
      label: 'Performance Leaders',
      items: [
        {
          name: 'SHAMAN',
          value: 3.20,
        },
        {
          name: 'MAGIC-XRPL',
          value: 2.50,
        },
        {
          name: 'MAGIC-POL',
          value: 2.30,
        },
        {
          name: 'WETH',
          value: 2.10,
        },
        {
          name: 'MINT-POL',
          value: 1.80,
        },
        {
          name: 'MINT-XRPL',
          value: 1.80,
        }
      ]
    },
    {
      label: 'Balance Rankings',
      items: [
        {
          name: 'MINT-XRPL',
          value: 130,
          unit: 'M'
        },
        {
          name: 'USDM',
          value: 94,
          unit: 'M'
        },
        {
          name: 'MINT-POL',
          value: 68.97,
          unit: 'M'
        },
        {
          name: 'MAGIC-XRPL',
          value: 20,
          unit: 'M'
        },
        {
          name: 'WIZARD',
          value: 10,
          unit: 'M'
        },
        {
          name: 'SHAMAN',
          value: 5,
          unit: 'M'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col items-center">
            <CircleMeter
              value={metric.value}
              maxValue={100}
              label={metric.label}
              color={metric.color}
              size={120}
            />
            <p className="text-sm text-white mt-2 text-center">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {distributions.map((dist, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{dist.label}</h3>
            <div className="space-y-3">
              {dist.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-white">
                  <span>{item.name}</span>
                  <span>{item.unit ? `${item.value}${item.unit}` : `${item.value}%`}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Utility functions for calculations
function calculatePortfolioHealth(assets: WalletAsset[]): number {
  return 85; // Example calculation
}

function calculateDiversificationScore(assets: WalletAsset[]): number {
  return 43; // Example calculation
}

function calculateRiskScore(assets: WalletAsset[]): number {
  return 93; // Example calculation
}

function calculatePerformanceScore(assets: WalletAsset[]): number {
  return 52; // Example calculation
}