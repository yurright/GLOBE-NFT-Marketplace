import { FC } from "react";
import { NFTCardProps } from "../NFTCard";
import { NFTMetadata } from "../../types";

export interface MyNFTCardProps extends NFTCardProps {
  saleStatus: boolean;
}

const MyNFTCard: FC<MyNFTCardProps> = ({
  image,
  name,
  tokenId,
  saleStatus,
}) => {
  return (
    <div className="bg-white border-2 text-green-900 font-semibold hover:border-green-400 border-blue-500 p-3 rounded-3xl">
      <li>
        <img src={image} alt={name} />
      </li>
      <li>{name}</li>
    </div>
  );
};

export default MyNFTCard;
