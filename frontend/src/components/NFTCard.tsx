import { FC } from "react";

export interface NFTCardProps {
  image: string;
  name: string;
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ image, name, tokenId }) => {
  return (
    <button className="bg-white border-2 border-blue-500 p-3 rounded-3xl hover:border-pink-500 active:border-blue-400 flex flex-col items-center text-green-900 font-semibold">
      <li>
        <img src={image} alt={name} />
      </li>
      <li>{name}</li>
    </button>
  );
};

export default NFTCard;
