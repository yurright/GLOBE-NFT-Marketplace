import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { NFTCardProps } from "../NFTCard";
import { NFTMetadata } from "../../types";
import { MyNFTCardProps } from "./MyNFTCard";

interface MyWallNFTCardProps extends MyNFTCardProps {
  selectedWall: number;
  setSelectedWall: Dispatch<SetStateAction<number>>;
  isSelectedWall: boolean[];
  setIsSelectedWall: Dispatch<SetStateAction<boolean[]>>;
}

const MyWallNFTCard: FC<MyWallNFTCardProps> = ({
  image,
  name,
  tokenId,
  saleStatus,
  selectedWall,
  setSelectedWall,
  isSelectedWall,
  setIsSelectedWall,
}) => {
  const onClickSelectWall = () => {
    if (
      isSelectedWall[0] == false &&
      isSelectedWall[1] == false &&
      isSelectedWall[2] == false &&
      isSelectedWall[3] == false &&
      isSelectedWall[4] == false
    ) {
      const temp = isSelectedWall.map((v, i) => {
        if (i + 1 === tokenId) {
          return !v;
        } else {
          return v;
        }
      });

      setIsSelectedWall(temp);

      setSelectedWall(tokenId);
    } else {
      alert("Must select one Wall!");
      console.log("reset case");
      const reset = [false, false, false, false, false];
      setIsSelectedWall(reset);
      setSelectedWall(0);
      console.log(isSelectedWall);
    }
  };

  useEffect(() => {
    console.log(isSelectedWall);
    console.log(selectedWall);
  }, [isSelectedWall]);

  return (
    <button
      onClick={onClickSelectWall}
      className={`bg-white border-2 text-green-900 font-semibold hover:border-green-400 border-blue-500 p-3 rounded-3xl ${
        isSelectedWall[tokenId - 1] && "border-5 border-green-400"
      }`}
    >
      <li>
        <img src={image} alt={name} />
      </li>
      <li>{name}</li>
    </button>
  );
};

export default MyWallNFTCard;
