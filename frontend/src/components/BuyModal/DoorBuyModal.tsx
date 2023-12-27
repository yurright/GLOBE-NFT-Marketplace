import { useSDK } from "@metamask/sdk-react";
import { FC, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../types";
import { MINT_DOOR_NFT_CONTRACT } from "../../abis/contractAddress";

interface ModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  tokenId: number;
}

const DoorBuyModal: FC<ModalProps> = ({ setIsOpen, tokenId }) => {
  const [message, setMessage] = useState<string>("");

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

  const onClickBuyDoor = async () => {
    try {
      if (!account || !mintDoorNFTContract || !salePartsNFTContract) return;
      const response = await salePartsNFTContract.methods
        .buyPartsNFT(
          //@ts-expect-error
          MINT_DOOR_NFT_CONTRACT,

          tokenId,
          process.env.REACT_APP_BENEFICIARY_ADDRESS
        )
        .send({ from: account, value: web3.utils.toWei(0.00001, "ether") });

      alert("My 페이지에서 구매한 NFT를 확인하세요!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 flex flex-col fixed top-1/2 left-1/3 w-[360px] h-[120px] bg-blue-500 border-2 border-blue-500  justify-center items-center rounded-3xl">
      <div className="mb-4  text-white font-semibold">{message}</div>
      <div>
        <div>{tokenId}</div>
        <button
          onClick={onClickBuyDoor}
          className="bg-white py-2 px-4 rounded-xl font-semibold  "
        >
          구매하기
        </button>
      </div>
    </div>
  );
};

export default DoorBuyModal;
