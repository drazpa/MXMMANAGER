import React from 'react';
import { WalletAsset } from '../../types/types';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { Star, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

interface TokenListTableProps {
  assets: WalletAsset[];
  favorites: Set<string>;
  onToggleFavorite: (symbol: string) => void;
  onSelectToken: (asset: WalletAsset) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export const TokenListTable: React.FC<TokenListTableProps> = ({
  assets,
  favorites,
  onToggleFavorite,
  onSelectToken,
  sortField,
  sortDirection,
  onSort,
}) => {
  const SortIcon = ({ field }: { field: string }) => (
    <div className="flex items-center cursor-pointer" onClick={() => onSort(field)}>
      <ArrowUpDown
        className={`w-4 h-4 ml-1 transition-colors ${
          sortField === field 
            ? 'text-primary-600 dark:text-primary-400' 
            : 'text-gray-400 dark:text-gray-500'
        }`}
      />
      {sortField === field && (
        <span className="sr-only">
          {sortDirection === 'asc' ? 'sorted ascending' : 'sorted descending'}
        </span>
      )}
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-8">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('favorite')}>
                <Star className="w-4 h-4" />
                <SortIcon field="favorite" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('symbol')}>
                Asset
                <SortIcon field="symbol" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('blockchain')}>
                Chain
                <SortIcon field="blockchain" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('balance')}>
                Balance
                <SortIcon field="balance" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('price')}>
                Price
                <SortIcon field="price" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('value')}>
                Value
                <SortIcon field="value" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('change24h')}>
                24h Change
                <SortIcon field="change24h" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {assets.map((asset) => (
            <tr 
              key={asset.symbol} 
              className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
              onClick={() => onSelectToken(asset)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(asset.symbol);
                  }}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 transition-colors duration-150 ${
                      favorites.has(asset.symbol)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-400 dark:text-gray-500 hover:text-yellow-400 dark:hover:text-yellow-400'
                    }`}
                  />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{asset.symbol}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{asset.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  asset.blockchain === 'Polygon'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {asset.blockchain}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{formatNumber(asset.balance)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{formatCurrency(asset.price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{formatCurrency(asset.value)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm flex items-center gap-1 ${
                  asset.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {asset.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {Math.abs(asset.change24h).toFixed(2)}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};