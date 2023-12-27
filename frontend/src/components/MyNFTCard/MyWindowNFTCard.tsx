import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { NFTCardProps } from "../NFTCard";
import { NFTMetadata } from "../../types";
import { MyNFTCardProps } from "./MyNFTCard";

interface MyWindowNFTCardProps extends MyNFTCardProps {
  selectedWindow: number;
  setSelectedWindow: Dispatch<SetStateAction<number>>;
  isSelectedWindow: boolean[];
  setIsSelectedWindow: Dispatch<SetStateAction<boolean[]>>;
}

const MyWindowNFTCard: FC<MyWindowNFTCardProps> = ({
  image,
  name,
  tokenId,
  saleStatus,
  selectedWindow,
  isSelectedWindow,
  setIsSelectedWindow,
  setSelectedWindow,
}) => {
  const onClickSelectWindow = () => {
    if (isSelectedWindow[0] == false && isSelectedWindow[1] == false) {
      const temp = isSelectedWindow.map((v, i) => {
        if (i + 1 === tokenId) {
          return !v;
        } else {
          return v;
        }
      });

      setIsSelectedWindow(temp);

      setSelectedWindow(tokenId);
    } else {
      alert("Must select one Window!");
      console.log("reset case");
      const reset = [false, false];
      setIsSelectedWindow(reset);
      setSelectedWindow(0);
      console.log(isSelectedWindow);
    }
  };

  useEffect(() => {
    console.log(isSelectedWindow);
    console.log(selectedWindow);
  }, [isSelectedWindow]);

  return (
    <button
      onClick={onClickSelectWindow}
      className={`bg-white border-2 text-green-900 font-semibold hover:border-green-400 border-blue-500 p-3 rounded-3xl ${
        isSelectedWindow[tokenId - 1] && "border-5 border-green-400"
      }`}
    >
      <li>
        <img src={image} alt={name} />
      </li>
      <li>{name}</li>
    </button>
  );
};

export default MyWindowNFTCard;
