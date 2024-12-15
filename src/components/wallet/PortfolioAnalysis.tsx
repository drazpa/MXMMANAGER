import React, { useState } from 'react';
import { WalletAsset } from '../../types/types';
import { formatCurrency } from '../../utils/formatters';
import { 
  BarChart2, Activity, PieChart, Wallet,
  ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle
} from 'lucide-react';

interface PortfolioAnalysisProps {
  assets: WalletAsset[];
}

export const PortfolioAnalysis: React.FC<PortfolioAnalysisProps> = ({ assets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateAnalysis = () => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const stablecoins = assets.filter(asset => ['USDC', 'USDT', 'USDM'].includes(asset.symbol));
    const stablecoinValue = stablecoins.reduce((sum, asset) => sum + asset.value, 0);
    const stablecoinRatio = stablecoinValue / totalValue;

    const chainDistribution = {
      Polygon: assets.filter(a => a.blockchain === 'Polygon')
        .reduce((sum, a) => sum + a.value, 0) / totalValue,
      XRPL: assets.filter(a => a.blockchain === 'XRPL')
        .reduce((sum, a) => sum + a.value, 0) / totalValue
    };

    const avgChange24h = assets.reduce((sum, asset) => sum + asset.change24h, 0) / assets.length;
    const volatility = Math.sqrt(
      assets.reduce((sum, asset) => sum + Math.pow(asset.change24h - avgChange24h, 2), 0) / assets.length
    );

    return {
      metrics: {
        totalValue,
        avgChange24h,
        volatility,
        stablecoinRatio,
        chainDistribution
      },
      topHoldings: assets
        .sort((a, b) => b.value - a.value)
        .slice(0, 5),
      bestPerformers: assets
        .sort((a, b) => b.change24h - a.change24h)
        .slice(0, 5),
      recommendations: [
        {
          type: stablecoinRatio < 0.2 ? 'warning' : 'success',
          title: 'Stablecoin Allocation',
          message: stablecoinRatio < 0.2 
            ? 'Consider increasing stablecoin holdings to reduce portfolio volatility'
            : 'Healthy stablecoin balance maintained'
        },
        {
          type: chainDistribution.Polygon < 0.2 || chainDistribution.XRPL < 0.2 ? 'warning' : 'success',
          title: 'Chain Diversification',
          message: chainDistribution.Polygon < 0.2 || chainDistribution.XRPL < 0.2
            ? 'Consider balancing assets across both chains for better diversification'
            : 'Good cross-chain diversification maintained'
        },
        {
          type: volatility > 5 ? 'warning' : 'success',
          title: 'Portfolio Volatility',
          message: volatility > 5
            ? 'High portfolio volatility detected. Consider rebalancing towards stable assets'
            : 'Portfolio volatility within acceptable range'
        }
      ]
    };
  };

  const analysis = generateAnalysis();

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full px-4 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
      >
        <BarChart2 className="w-5 h-5" />
        Analyze Portfolio
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Analysis</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Value</h3>
                    </div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                      {formatCurrency(analysis.metrics.totalValue)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Change</h3>
                    </div>
                    <p className={`text-xl font-bold mt-2 ${
                      analysis.metrics.avgChange24h >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {analysis.metrics.avgChange24h >= 0 ? '+' : ''}
                      {analysis.metrics.avgChange24h.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Stablecoin Ratio</h3>
                    </div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                      {(analysis.metrics.stablecoinRatio * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Top Holdings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Holdings</h3>
                  <div className="space-y-3">
                    {analysis.topHoldings.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{asset.symbol}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {((asset.value / analysis.metrics.totalValue) * 100).toFixed(1)}% of portfolio
                          </p>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(asset.value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Performers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Performers (24h)</h3>
                  <div className="space-y-3">
                    {analysis.bestPerformers.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{asset.symbol}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(asset.value)}</p>
                        </div>
                        <div className="flex items-center text-green-600 dark:text-green-400">
                          {asset.change24h >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          {asset.change24h.toFixed(2)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        {rec.type === 'warning' ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{rec.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{rec.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};