import React, { useState, KeyboardEvent } from 'react';
import { Search, KeyRound } from 'lucide-react';

interface UserWalletInputProps {
  onSubmit: (address: string) => void;
}

export const UserWalletInput: React.FC<UserWalletInputProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const validateAndSubmit = () => {
    setError('');

    const cleanAddress = address.trim();
    if (!cleanAddress) {
      setError('Please enter a wallet address');
      return;
    }

    // Basic Ethereum address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(cleanAddress)) {
      setError('Please enter a valid Ethereum address');
      return;
    }

    onSubmit(cleanAddress);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndSubmit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateAndSubmit();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter wallet address (0x...)"
            className={`w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <KeyRound className="w-4 h-4 mr-2" />
            Press Enter or click Monitor Wallet to begin tracking
          </div>
          <button
            type="button"
            onClick={validateAndSubmit}
            className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            Monitor Wallet
          </button>
        </div>
      </form>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};