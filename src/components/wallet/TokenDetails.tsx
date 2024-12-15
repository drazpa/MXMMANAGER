import React from 'react';
import { WalletAsset } from '../../types/types';
import { formatCurrency, formatNumber } from '../../utils/reserveCalculations';
import { X, ExternalLink, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TokenDetailsProps {
  asset: WalletAsset;
  onClose: () => void;
}

export const TokenDetails: React.FC<TokenDetailsProps> = ({ asset, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{asset.symbol}</h2>
              <p className="text-gray-500 dark:text-gray-400">{asset.name}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              asset.blockchain === 'Polygon'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {asset.blockchain}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Balance</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(asset.balance)} {asset.symbol}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Price</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(asset.price)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Value</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(asset.value)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Change</h3>
                <div className={`flex items-center gap-1 text-xl font-bold ${
                  asset.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {asset.change24h >= 0 ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5" />
                  )}
                  {Math.abs(asset.change24h).toFixed(2)}%
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Explorer</h3>
                <a
                  href={`https://${asset.blockchain === 'Polygon' ? 'polygonscan.com' : 'xrpscan.com'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline mt-1"
                >
                  View on {asset.blockchain === 'Polygon' ? 'Polygonscan' : 'XRPL Explorer'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};