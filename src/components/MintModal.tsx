import React, { useState } from 'react';
import { formatCurrency } from '../utils/reserveCalculations';
import { MXMState } from '../types/types';
import { X } from 'lucide-react';

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  mxmState: MXMState;
}

export const MintModal: React.FC<MintModalProps> = ({ isOpen, onClose, mxmState }) => {
  const [amount, setAmount] = useState<string>('');
  const [paymentAsset, setPaymentAsset] = useState<string>('USDC');

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Minting ${amount} MXM using ${paymentAsset}`);
    onClose();
  };

  if (!isOpen) return null;

  const estimatedCost = parseFloat(amount || '0') * mxmState.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Mint MXM Tokens</h2>

        <form onSubmit={handleMint}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount to Mint
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter amount"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pay with
              </label>
              <select
                value={paymentAsset}
                onChange={(e) => setPaymentAsset(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
              </select>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Price:</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(mxmState.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Cost:</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(estimatedCost)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 dark:bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
            >
              Mint MXM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};