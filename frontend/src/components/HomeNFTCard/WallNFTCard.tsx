import { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../types";
import { SALE_PARTS_NFT_CONTRACT } from "../../abis/contractAddress";
import Modal from "../BuyModal/WallBuyModal";
import WallBuyModal from "../BuyModal/WallBuyModal";

export interface NFTCardProps {
  image: string;
  name: string;
  tokenId: number;
}

const WallNFTCard: FC<NFTCardProps> = ({ image, name, tokenId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    mintChimneyNFTContract,
    mintDoorNFTContract,
    mintHouseNFTContract,
    mintRoofNFTContract,
    mintWallNFTContract,
    mintWindowNFTContract,
    salePartsNFTContract,
    account,
    web3,
  } = useOutletContext<OutletContext>();

  const onClickModal = async () => {
    if (!account || !mintWallNFTContract || !salePartsNFTContract) {
      alert("로그인하세요");
      return;
    }

    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={onClickModal}
        className="bg-white border-2 border-blue-500 p-3 rounded-3xl hover:border-pink-500 active:border-blue-400 text-green-900 font-semibold"
      >
        <li>
          <img src={image} alt={name} />
        </li>
        <li>{name}</li>
      </button>
      {isOpen && <WallBuyModal setIsOpen={setIsOpen} tokenId={tokenId} />}
    </>
  );
};

export default WallNFTCard;
