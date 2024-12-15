import React, { useState, useCallback, useEffect } from 'react';
import { WalletAsset, Blockchain } from '../../types/types';
import { TokenListHeader } from './TokenListHeader';
import { TokenListTable } from './TokenListTable';
import { TokenDetails } from './TokenDetails';

interface WalletTokenListProps {
  assets: WalletAsset[];
}

type SortField = 'symbol' | 'balance' | 'price' | 'value' | 'change24h' | 'blockchain';
type SortDirection = 'asc' | 'desc';

export const WalletTokenList: React.FC<WalletTokenListProps> = ({ assets }) => {
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('tokenFavorites');
      return new Set(saved ? JSON.parse(saved) : []);
    } catch {
      return new Set();
    }
  });

  const [sortField, setSortField] = useState<SortField>('value');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain | 'all'>('all');
  const [selectedToken, setSelectedToken] = useState<WalletAsset | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('tokenFavorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = useCallback((symbol: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(symbol)) {
        newFavorites.delete(symbol);
      } else {
        newFavorites.add(symbol);
      }
      return newFavorites;
    });
  }, []);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  }, [sortField]);

  const filteredAssets = assets.filter(asset => 
    (selectedBlockchain === 'all' || asset.blockchain === selectedBlockchain) &&
    (searchTerm === '' || 
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    // First sort by favorites
    if (favorites.has(a.symbol) && !favorites.has(b.symbol)) return -1;
    if (!favorites.has(a.symbol) && favorites.has(b.symbol)) return 1;

    // Then sort by the selected field
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle special cases for string comparisons
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    }

    // Handle numeric comparisons
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <div className="space-y-4">
      <TokenListHeader
        selectedBlockchain={selectedBlockchain}
        onBlockchainChange={setSelectedBlockchain}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <TokenListTable
          assets={sortedAssets}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectToken={setSelectedToken}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      {selectedToken && (
        <TokenDetails
          asset={selectedToken}
          onClose={() => setSelectedToken(null)}
          isFavorite={favorites.has(selectedToken.symbol)}
          onToggleFavorite={() => toggleFavorite(selectedToken.symbol)}
        />
      )}
    </div>
  );
};