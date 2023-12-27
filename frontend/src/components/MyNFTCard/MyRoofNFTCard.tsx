import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { MyNFTCardProps } from "./MyNFTCard";

interface MyRoofNFTCardProps extends MyNFTCardProps {
  selectedRoof: number;
  setSelectedRoof: Dispatch<SetStateAction<number>>;
  isSelectedRoof: boolean[];
  setIsSelectedRoof: Dispatch<SetStateAction<boolean[]>>;
}

const MyRoofNFTCard: FC<MyRoofNFTCardProps> = ({
  image,
  name,
  tokenId,
  saleStatus,
  selectedRoof,
  setSelectedRoof,
  isSelectedRoof,
  setIsSelectedRoof,
}) => {
  const onClickSelectRoof = () => {
    if (
      isSelectedRoof[0] == false &&
      isSelectedRoof[1] == false &&
      isSelectedRoof[2] == false &&
      isSelectedRoof[3] == false &&
      isSelectedRoof[4] == false
    ) {
      const temp = isSelectedRoof.map((v, i) => {
        if (i + 1 === tokenId) {
          return !v;
        } else {
          return v;
        }
      });

      setIsSelectedRoof(temp);

      setSelectedRoof(tokenId);
    } else {
      alert("Must select one roof!");
      console.log("reset case");
      const reset = [false, false, false, false, false];
      setIsSelectedRoof(reset);
      setSelectedRoof(0);
      console.log(isSelectedRoof);
    }
  };

  useEffect(() => {
    console.log(isSelectedRoof);
    console.log(selectedRoof);
  }, [isSelectedRoof]);

  return (
    <button
      onClick={onClickSelectRoof}
      className={`bg-white border-2 text-green-900 font-semibold hover:border-green-400 border-blue-500 p-3 rounded-3xl ${
        isSelectedRoof[tokenId - 1] && "border-5 border-green-400"
      }`}
    >
      <li>
        <img src={image} alt={name} />
      </li>
      <li>{name}</li>
    </button>
  );
};

export default MyRoofNFTCard;
