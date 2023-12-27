import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { NFTCardProps } from "../NFTCard";
import { NFTMetadata } from "../../types";
import { MyNFTCardProps } from "./MyNFTCard";

interface MyChimneyNFTCardProps extends MyNFTCardProps {
  selectedChimney: number;
  setSelectedChimney: Dispatch<SetStateAction<number>>;
  isSelectedChimney: boolean[];
  setIsSelectedChimney: Dispatch<SetStateAction<boolean[]>>;
}

const MyChimneyNFTCard: FC<MyChimneyNFTCardProps> = ({
  image,
  name,
  tokenId,
  saleStatus,
  selectedChimney,
  isSelectedChimney,
  setIsSelectedChimney,
  setSelectedChimney,
}) => {
  const onClickSelectChimney = () => {
    if (isSelectedChimney[0] == false && isSelectedChimney[1] == false) {
      const temp = isSelectedChimney.map((v, i) => {
        if (i + 1 === tokenId) {
          return !v;
        } else {
          return v;
        }
      });

      setIsSelectedChimney(temp);

      setSelectedChimney(tokenId);
    } else {
      alert("Must select one chimney!");
      console.log("reset case");
      const reset = [false, false];
      setIsSelectedChimney(reset);
      setSelectedChimney(0);
      console.log(isSelectedChimney);
    }
  };

  useEffect(() => {
    console.log(isSelectedChimney);
    console.log(selectedChimney);
  }, [isSelectedChimney]);

  return (
    <button
      onClick={onClickSelectChimney}
      className={`bg-white border-2 text-green-900 font-semibold hover:border-green-400 border-blue-500 p-3 rounded-3xl ${
        isSelectedChimney[tokenId - 1] && "border-5 border-green-400"
      }`}
    >
      <li>
        <img src={image} alt={name} />
      </li>
      <li>{name}</li>
    </button>
  );
};

export default MyChimneyNFTCard;
