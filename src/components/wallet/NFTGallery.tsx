import React, { useState } from 'react';
import { Frame, ExternalLink, Image, Loader } from 'lucide-react';
import { useNFTData } from '../../hooks/useNFTData';

interface NFTGalleryProps {
  walletAddress: string;
}

export const NFTGallery: React.FC<NFTGalleryProps> = ({ walletAddress }) => {
  const { data: nfts, isLoading, error } = useNFTData(walletAddress);
  const [selectedNFT, setSelectedNFT] = useState<typeof nfts[0] | null>(null);

  if (isLoading) {
    return (
      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content">
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content">
          <div className="text-red-500 text-center py-4">Error loading NFT data</div>
        </div>
      </div>
    );
  }

  if (!nfts?.length) {
    return (
      <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
        <div className="card-content">
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <Image className="w-12 h-12 mb-4" />
            <p>No NFTs found in this wallet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark">
      <div className="card-content">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Frame className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">NFT Collection</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">({nfts.length} items)</span>
          </div>
          <a
            href={`https://opensea.io/${walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline"
          >
            View on OpenSea
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div
              key={`${nft.contractAddress}-${nft.tokenId}`}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedNFT(nft)}
            >
              <div className="aspect-square relative">
                <img
                  src={nft.imageUrl}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{nft.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Token ID: {nft.tokenId}
                </p>
                {nft.attributes && nft.attributes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {nft.attributes.slice(0, 3).map((attr, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                      >
                        {attr.trait_type}: {attr.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* NFT Details Modal */}
        {selectedNFT && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedNFT.name}</h3>
                  <button
                    onClick={() => setSelectedNFT(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="aspect-square mb-6">
                  <img
                    src={selectedNFT.imageUrl}
                    alt={selectedNFT.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Token ID</h4>
                    <p className="text-gray-900 dark:text-white">{selectedNFT.tokenId}</p>
                  </div>

                  {selectedNFT.description && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                      <p className="text-gray-900 dark:text-white">{selectedNFT.description}</p>
                    </div>
                  )}

                  {selectedNFT.attributes && selectedNFT.attributes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Attributes</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedNFT.attributes.map((attr, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                          >
                            <p className="text-xs text-gray-500 dark:text-gray-400">{attr.trait_type}</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{attr.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};