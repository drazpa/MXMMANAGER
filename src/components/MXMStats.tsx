import React from 'react';
import { MXMState } from '../types/types';
import { formatCurrency, formatNumber } from '../utils/reserveCalculations';
import { Coins, CircleDollarSign, Wallet, BarChart3 } from 'lucide-react';

interface MXMStatsProps {
  mxmState: MXMState;
}

export const MXMStats: React.FC<MXMStatsProps> = ({ mxmState }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[
        {
          icon: <Coins className="w-8 h-8 text-primary-600 dark:text-primary-400" />,
          label: "MXM Price",
          value: formatCurrency(mxmState.price)
        },
        {
          icon: <CircleDollarSign className="w-8 h-8 text-primary-600 dark:text-primary-400" />,
          label: "Market Cap",
          value: formatCurrency(mxmState.marketCap)
        },
        {
          icon: <Wallet className="w-8 h-8 text-primary-600 dark:text-primary-400" />,
          label: "Circulating Supply",
          value: `${formatNumber(mxmState.circulatingSupply)} MXM`
        },
        {
          icon: <BarChart3 className="w-8 h-8 text-primary-600 dark:text-primary-400" />,
          label: "Backed Ratio",
          value: `${mxmState.backed.toFixed(2)}%`
        }
      ].map((stat, index) => (
        <div key={index} className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
          <div className="card-content">
            <div className="flex items-center gap-4">
              {stat.icon}
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};