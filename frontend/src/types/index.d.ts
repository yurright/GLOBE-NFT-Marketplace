import { Contract, ContractAbi } from "web3";

export interface OutletContext {
  account: string;
  web3: Web3;
  mintHouseNFTContract: Contract<ContractAbi>;
  mintChimneyNFTContract: Contract<ContractAbi>;
  mintDoorNFTContract: Contract<ContractAbi>;
  mintRoofNFTContract: Contract<ContractAbi>;
  mintWallNFTContract: Contract<ContractAbi>;
  mintWindowNFTContract: Contract<ContractAbi>;
  transferHouseNFTContract: Contract<ContractAbi>;
  salePartsNFTContract: Contract<ContractAbi>;
}

export interface NFTMetadata {
  tokenId?: number;
  name: string;
  image: string;
  description: string;
  attributes: {
    trait_type: string;
    value: string;
  };
  amount?: number;
}
