import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Blockchain } from '../../types/types';

interface TokenListHeaderProps {
  selectedBlockchain: Blockchain | 'all';
  onBlockchainChange: (blockchain: Blockchain | 'all') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const TokenListHeader: React.FC<TokenListHeaderProps> = ({
  selectedBlockchain,
  onBlockchainChange,
  searchTerm,
  onSearchChange,
}) => {
  const blockchains: Array<{ value: Blockchain | 'all'; label: string }> = [
    { value: 'all', label: 'All Chains' },
    { value: 'Polygon', label: 'Polygon' },
    { value: 'XRPL', label: 'XRPL' }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Token Holdings</h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tokens..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedBlockchain}
            onChange={(e) => onBlockchainChange(e.target.value as Blockchain | 'all')}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {blockchains.map(chain => (
              <option key={chain.value} value={chain.value}>{chain.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};