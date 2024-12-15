import React from 'react';
import { ReserveAsset, MXMState } from '../types/types';
import { calculateTotalReserveValue, formatCurrency } from '../utils/reserveCalculations';
import { Coins, LineChart, PieChart } from 'lucide-react';

interface ReserveStatsProps {
  reserves: ReserveAsset[];
  mxmState: MXMState;
}

export const ReserveStats: React.FC<ReserveStatsProps> = ({ reserves, mxmState }) => {
  const totalValue = calculateTotalReserveValue(reserves);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <Coins className="w-8 h-8 text-blue-600" />
          <div>
            <h3 className="text-gray-500 text-sm">MXM Price</h3>
            <p className="text-2xl font-bold">{formatCurrency(mxmState.price)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <LineChart className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="text-gray-500 text-sm">Total Reserve Value</h3>
            <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <PieChart className="w-8 h-8 text-purple-600" />
          <div>
            <h3 className="text-gray-500 text-sm">Reserve Ratio</h3>
            <p className="text-2xl font-bold">{(mxmState.reserveRatio * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};