import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { NFTCardProps } from "../NFTCard";
import { NFTMetadata } from "../../types";
import { MyNFTCardProps } from "./MyNFTCard";

interface MyDoorNFTCardProps extends MyNFTCardProps {
  selectedDoor: number;
  setSelectedDoor: Dispatch<SetStateAction<number>>;
  isSelectedDoor: boolean[];
  setIsSelectedDoor: Dispatch<SetStateAction<boolean[]>>;
}

const MyDoorNFTCard: FC<MyDoorNFTCardProps> = ({
  image,
  name,
  tokenId,
  saleStatus,
  selectedDoor,
  isSelectedDoor,
  setIsSelectedDoor,
  setSelectedDoor,
}) => {
  const onClickSelectDoor = () => {
    if (isSelectedDoor[0] == false && isSelectedDoor[1] == false) {
      const temp = isSelectedDoor.map((v, i) => {
        if (i + 1 === tokenId) {
          return !v;
        } else {
          return v;
        }
      });

      setIsSelectedDoor(temp);

      setSelectedDoor(tokenId);
    } else {
      alert("Must select one Door!");
      console.log("reset case");
      const reset = [false, false];
      setIsSelectedDoor(reset);
      setSelectedDoor(0);
      console.log(isSelectedDoor);
    }
  };

  useEffect(() => {
    console.log(isSelectedDoor);
    console.log(selectedDoor);
  }, [isSelectedDoor]);

  return (
    <button
      onClick={onClickSelectDoor}
      className={`bg-white border-2 text-green-900 font-semibold hover:border-green-400 border-blue-500 p-3 rounded-3xl ${
        isSelectedDoor[tokenId - 1] && "border-5 border-green-400"
      }`}
    >
      <li>
        <img src={image} alt={name} />
      </li>
      <li>{name}</li>
    </button>
  );
};

export default MyDoorNFTCard;
