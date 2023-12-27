import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";
import { Contract, ContractAbi, Web3 } from "web3";

import Header from "./Header";
import mintHouseNftAbi from "../abis/mintHouseNFTAbi.json";
import mintPartsNftAbi from "../abis/mintPartsNFTAbi.json";
import {
  MINT_CHIMNEY_NFT_CONTRACT,
  MINT_DOOR_NFT_CONTRACT,
  MINT_HOUSE_NFT_CONTRACT,
  MINT_ROOF_NFT_CONTRACT,
  MINT_WALL_NFT_CONTRACT,
  MINT_WINDOW_NFT_CONTRACT,
  TRANSFER_HOUSE_NFT_CONTRACT,
  SALE_PARTS_NFT_CONTRACT,
} from "../abis/contractAddress";
import transferHouseNFTAbi from "../abis/transferHouseNFTAbi.json";
import salePartsNFTAbi from "../abis/salePartsNFTAbi.json";

const Layout: FC = () => {
  const [account, setAccount] = useState<string>("");
  const [web3, setWeb3] = useState<Web3>();
  const [mintHouseNFTContract, setMintHouseNFTContract] =
    useState<Contract<ContractAbi>>();
  const [mintChimneyNFTContract, setMintChimneyNFTContract] =
    useState<Contract<ContractAbi>>();
  const [mintDoorNFTContract, setMintDoorNFTContract] =
    useState<Contract<ContractAbi>>();
  const [mintRoofNFTContract, setMintRoofNFTContract] =
    useState<Contract<ContractAbi>>();
  const [mintWallNFTContract, setMintWallNFTContract] =
    useState<Contract<ContractAbi>>();
  const [mintWindowNFTContract, setMintWindowNFTContract] =
    useState<Contract<ContractAbi>>();
  const [transferHouseNFTContract, settransferHouseNFTContract] =
    useState<Contract<ContractAbi>>();
  const [salePartsNFTContract, setSalePartsNFTContract] =
    useState<Contract<ContractAbi>>();

  const { provider } = useSDK();

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);

  useEffect(() => {
    if (!web3) return;

    setMintHouseNFTContract(
      new web3.eth.Contract(mintHouseNftAbi, MINT_HOUSE_NFT_CONTRACT)
    );
    setMintChimneyNFTContract(
      new web3.eth.Contract(mintPartsNftAbi, MINT_CHIMNEY_NFT_CONTRACT)
    );
    setMintDoorNFTContract(
      new web3.eth.Contract(mintPartsNftAbi, MINT_DOOR_NFT_CONTRACT)
    );
    setMintRoofNFTContract(
      new web3.eth.Contract(mintPartsNftAbi, MINT_ROOF_NFT_CONTRACT)
    );
    setMintWallNFTContract(
      new web3.eth.Contract(mintPartsNftAbi, MINT_WALL_NFT_CONTRACT)
    );
    setMintWindowNFTContract(
      new web3.eth.Contract(mintPartsNftAbi, MINT_WINDOW_NFT_CONTRACT)
    );

    settransferHouseNFTContract(
      new web3.eth.Contract(transferHouseNFTAbi, TRANSFER_HOUSE_NFT_CONTRACT)
    );

    setSalePartsNFTContract(
      new web3.eth.Contract(salePartsNFTAbi, SALE_PARTS_NFT_CONTRACT)
    );
  }, [web3]);

  return (
    <div className=" min-h-screen max-w-[1280px] mx-auto flex flex-col">
      <Header account={account} setAccount={setAccount} />
      <Outlet
        context={{
          account,
          web3,
          mintChimneyNFTContract,
          mintDoorNFTContract,
          mintHouseNFTContract,
          mintRoofNFTContract,
          mintWallNFTContract,
          mintWindowNFTContract,
          transferHouseNFTContract,
          salePartsNFTContract,
        }}
      />
    </div>
  );
};

export default Layout;
