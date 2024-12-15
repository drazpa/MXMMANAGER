import { useQuery } from '@tanstack/react-query';
import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: "demo", // Replace with your Alchemy API key in production
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(config);

export interface NFTData {
  tokenId: string;
  contractAddress: string;
  name: string;
  imageUrl: string;
  description?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export const useNFTData = (walletAddress: string) => {
  return useQuery({
    queryKey: ['nftData', walletAddress],
    queryFn: async () => {
      try {
        // Fetch NFTs owned by the address
        const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
        
        return nfts.ownedNfts.map(nft => ({
          tokenId: nft.tokenId,
          contractAddress: nft.contract.address,
          name: nft.title || `NFT #${nft.tokenId}`,
          imageUrl: nft.media[0]?.gateway || 'https://via.placeholder.com/400?text=No+Image',
          description: nft.description,
          attributes: nft.rawMetadata?.attributes as Array<{
            trait_type: string;
            value: string | number;
          }> || []
        }));
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        return [];
      }
    },
    enabled: Boolean(walletAddress),
    staleTime: 300000, // Consider data fresh for 5 minutes
  });
};