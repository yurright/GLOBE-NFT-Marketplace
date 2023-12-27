import { FC, useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../components/NFTCard";
import { useOutletContext } from "react-router-dom";
import { NFTMetadata, OutletContext } from "../types";
import HouseNFTCard from "../components/HomeNFTCard/HouseNFTCard";
import ChimneyNFTCard from "../components/HomeNFTCard/ChimneyNFTCard";
import DoorNFTCard from "../components/HomeNFTCard/DoorNFTCard";
import {
  MINT_CHIMNEY_NFT_CONTRACT,
  SALE_PARTS_NFT_CONTRACT,
} from "../abis/contractAddress";
import WallNFTCard from "../components/HomeNFTCard/WallNFTCard";
import WindowNFTCard from "../components/HomeNFTCard/WindowNFTCard";

const GET_AMOUNT = 6;

const Home: FC = () => {
  const [totalHouseNFT, setTotalHouseNFT] = useState<number>(0);
  const [totalChimneyNFT, setTotalChimneyNFT] = useState<number>(0);
  const [totalDoorNFT, setTotalDoorNFT] = useState<number>(0);
  const [totalRoofNFT, setTotalRoofNFT] = useState<number>(0);
  const [totalWallNFT, setTotalWallNFT] = useState<number>(0);
  const [totalWindowNFT, setTotalWindowNFT] = useState<number>(0);

  const [houseMetadataArray, setHouseMetadataArray] = useState<NFTMetadata[]>(
    []
  );
  const [chimneyMetadataArray, setChimneyMetadataArray] = useState<
    NFTMetadata[]
  >([]);
  const [doorMetadataArray, setDoorMetadataArray] = useState<NFTMetadata[]>([]);
  const [roofMetadataArray, setRoofMetadataArray] = useState<NFTMetadata[]>([]);
  const [wallMetadataArray, setWallMetadataArray] = useState<NFTMetadata[]>([]);
  const [windowMetadataArray, setWindowMetadataArray] = useState<NFTMetadata[]>(
    []
  );

  const [houseSaleStatus, setHouseSaleStatus] = useState<boolean>(false);
  const [chimneySaleStatus, setChimneySaleStatus] = useState<boolean>(false);
  const [doorSaleStatus, setDoorSaleStatus] = useState<boolean>(false);
  const [roofSaleStatus, setRoofSaleStatus] = useState<boolean>(false);
  const [wallSaleStatus, setWallSaleStatus] = useState<boolean>(false);
  const [windowSaleStatus, setWindowSaleStatus] = useState<boolean>(false);

  const {
    mintChimneyNFTContract,
    mintDoorNFTContract,
    mintHouseNFTContract,
    mintRoofNFTContract,
    mintWallNFTContract,
    mintWindowNFTContract,
  } = useOutletContext<OutletContext>();

  const getHouseTotalSupply = async () => {
    try {
      if (!mintHouseNFTContract) return;

      const totalHouseSupply = await mintHouseNFTContract.methods
        .totalSupply()
        .call();

      setTotalHouseNFT(Number(totalHouseSupply));
    } catch (error) {
      console.log(error);
    }
  };

  const getPartsTotalSupply = () => {
    setTotalChimneyNFT(2);
    setTotalDoorNFT(2);
    setTotalRoofNFT(5);
    setTotalWallNFT(5);
    setTotalWindowNFT(2);
  };

  const getHouseNFTs = async () => {
    try {
      if (!mintHouseNFTContract || houseMetadataArray.length != 0) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < GET_AMOUNT; i++) {
        const metadataURI: string = await mintHouseNFTContract.methods
          //@ts-expect-error
          .tokenURI(i)
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: i + 1 });
      }

      setHouseMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getHouseSaleStatus = async () => {
    try {
      const isApproved: boolean = await mintHouseNFTContract.methods
        //@ts-expect-error
        .isApprovedForAll(MINT_HOUSE_NFT_CONTRACT, TRANSFER_HOUSE_NFT_CONTRACT)
        .call();

      setHouseSaleStatus(isApproved);
    } catch (error) {
      console.log(error);
    }
  };

  const getChimneyNFTs = async () => {
    try {
      if (!mintChimneyNFTContract || chimneyMetadataArray.length != 0) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 2; i++) {
        const metadataURI: string = await mintChimneyNFTContract.methods
          //@ts-expect-error
          .uri(i + 1)
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: i + 1 });
      }

      setChimneyMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getChimneySaleStatus = async () => {
    try {
      const isApproved: boolean = await mintChimneyNFTContract.methods
        //@ts-expect-error
        .isApprovedForAll(MINT_CHIMNEY_NFT_CONTRACT, SALE_PARTS_NFT_CONTRACT)
        .call();

      setChimneySaleStatus(isApproved);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoorNFTs = async () => {
    try {
      if (!mintDoorNFTContract || doorMetadataArray.length != 0) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 2; i++) {
        const metadataURI: string = await mintDoorNFTContract.methods
          //@ts-expect-error
          .uri(i + 1)
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: i + 1 });
      }

      setDoorMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoorSaleStatus = async () => {
    try {
      const isApproved: boolean = await mintDoorNFTContract.methods
        //@ts-expect-error
        .isApprovedForAll(MINT_DOOR_NFT_CONTRACT, SALE_PARTS_NFT_CONTRACT)
        .call();

      setDoorSaleStatus(isApproved);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoofNFTs = async () => {
    try {
      if (!mintRoofNFTContract || roofMetadataArray.length != 0) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 5; i++) {
        const metadataURI: string = await mintRoofNFTContract.methods
          //@ts-expect-error
          .uri(i + 1)
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: i + 1 });
      }

      setRoofMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoofSaleStatus = async () => {
    try {
      const isApproved: boolean = await mintRoofNFTContract.methods
        //@ts-expect-error
        .isApprovedForAll(MINT_ROOF_NFT_CONTRACT, SALE_PARTS_NFT_CONTRACT)
        .call();

      setRoofSaleStatus(isApproved);
    } catch (error) {
      console.log(error);
    }
  };

  const getWallNFTs = async () => {
    try {
      if (!mintWallNFTContract || wallMetadataArray.length != 0) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 5; i++) {
        const metadataURI: string = await mintWallNFTContract.methods
          //@ts-expect-error
          .uri(i + 1)
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: i + 1 });
      }

      setWallMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getWallSaleStatus = async () => {
    try {
      const isApproved: boolean = await mintWallNFTContract.methods
        //@ts-expect-error
        .isApprovedForAll(MINT_WALL_NFT_CONTRACT, SALE_PARTS_NFT_CONTRACT)
        .call();

      setWallSaleStatus(isApproved);
    } catch (error) {
      console.log(error);
    }
  };

  const getWindowNFTs = async () => {
    try {
      if (!mintWindowNFTContract || windowMetadataArray.length != 0) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 2; i++) {
        const metadataURI: string = await mintWindowNFTContract.methods
          //@ts-expect-error
          .uri(i + 1)
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: i + 1 });
      }

      setWindowMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getWindowSaleStatus = async () => {
    try {
      const isApproved: boolean = await mintWindowNFTContract.methods
        //@ts-expect-error
        .isApprovedForAll(MINT_WINDOW_NFT_CONTRACT, SALE_PARTS_NFT_CONTRACT)
        .call();

      setWindowSaleStatus(isApproved);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHouseTotalSupply();
    getPartsTotalSupply();
  }, [mintHouseNFTContract, mintChimneyNFTContract]);

  useEffect(() => {
    if (totalHouseNFT === 0) return;

    getHouseNFTs();

    if (totalChimneyNFT === 0) return;

    getChimneyNFTs();
    getDoorNFTs();
    getRoofNFTs();
    getWallNFTs();
    getWindowNFTs();

    return () => {};
  }, [totalHouseNFT, totalChimneyNFT]);

  useEffect(() => {
    if (
      !mintHouseNFTContract ||
      !mintChimneyNFTContract ||
      !mintDoorNFTContract ||
      !mintRoofNFTContract ||
      !mintWallNFTContract ||
      !mintWindowNFTContract
    )
      return;
    getHouseSaleStatus();
    getChimneySaleStatus();
    getDoorSaleStatus();
    getRoofSaleStatus();
    getWallSaleStatus();
    getWindowSaleStatus();
  }, [
    mintHouseNFTContract,
    mintChimneyNFTContract,
    mintDoorNFTContract,
    mintRoofNFTContract,
    mintWallNFTContract,
    mintWindowNFTContract,
  ]);

  return (
    <>
      <div className="text-center">
        <div className="text-8xl font-bold py-8 text-green-900">
          GLOBE NFT Marketplace
        </div>
        <div className="text-2xl font-semibold mb-8 text-green-900">
          Build your own House NFT
        </div>
        <div className="flex w-[1280px] bg-gradient-to-b from-green-400 to-white rounded-3xl">
          <img
            className="w-1/3"
            src="https://beige-absent-caterpillar-719.mypinata.cloud/ipfs/QmSnjcuvVSBqoGrcrWn8HLZbHuzE5VLMW1gGzJSveB1kLe/154.png"
            alt="house1"
          />
          <img
            className="w-1/3"
            src="https://beige-absent-caterpillar-719.mypinata.cloud/ipfs/QmSnjcuvVSBqoGrcrWn8HLZbHuzE5VLMW1gGzJSveB1kLe/2.png"
            alt="house1"
          />
          <img
            className="w-1/3"
            src="https://beige-absent-caterpillar-719.mypinata.cloud/ipfs/QmSnjcuvVSBqoGrcrWn8HLZbHuzE5VLMW1gGzJSveB1kLe/165.png"
            alt="house1"
          />
        </div>
      </div>
      <div className=" grow h-[600px] overflow-y-auto">
        <div className="">
          <div className="flex justify-between  p-2 border-b-4 border-green-400 ">
            <div className="text-xl font-semibold text-green-900">
              House NFTs
              {houseSaleStatus && <span className="bg-pink-600">On Sale</span>}
            </div>
            <div>전체 보기</div>
          </div>
          <ul className="p-8 grid grid-cols-4 gap-8">
            {houseMetadataArray?.map((v, i) => (
              <HouseNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between  p-2 border-b-4 border-green-400 ">
            <h2 className=" text-xl font-semibold text-green-900">
              Chimney NFTs
              {chimneySaleStatus && (
                <span className="bg-pink-600 ml-2 rounded-2xl py-1 px-2 text-white ">
                  On Sale
                </span>
              )}
            </h2>
          </div>

          <ul className="p-8 grid grid-cols-4 gap-8">
            {chimneyMetadataArray?.map((v, i) => (
              <ChimneyNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between  p-2 border-b-4 border-green-400 ">
            <h2 className=" text-xl font-semibold text-green-900">
              Door NFTs
              {doorSaleStatus && (
                <span className="bg-pink-600 ml-2 rounded-2xl py-1 px-2 text-white ">
                  On Sale
                </span>
              )}
            </h2>
          </div>

          <ul className="p-8 grid grid-cols-4 gap-8">
            {doorMetadataArray?.map((v, i) => (
              <DoorNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between  p-2 border-b-4 border-green-400 ">
            <h2 className=" text-xl font-semibold text-green-900">
              Roof NFTs
              {roofSaleStatus && (
                <span className="bg-pink-600 ml-2 rounded-2xl py-1 px-2 text-white ">
                  On Sale
                </span>
              )}
            </h2>
          </div>

          <ul className="p-8 grid grid-cols-4 gap-8">
            {roofMetadataArray?.map((v, i) => (
              <WallNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between  p-2 border-b-4 border-green-400 ">
            <h2 className=" text-xl font-semibold text-green-900">
              Wall NFTs
              {wallSaleStatus && (
                <span className="bg-pink-600 ml-2 rounded-2xl py-1 px-2 text-white ">
                  On Sale
                </span>
              )}
            </h2>
          </div>

          <ul className="p-8 grid grid-cols-4 gap-8">
            {wallMetadataArray?.map((v, i) => (
              <WallNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between  p-2 border-b-4 border-green-400 ">
            <h2 className=" text-xl font-semibold text-green-900">
              Window NFTs
              {windowSaleStatus && (
                <span className="bg-pink-600 ml-2 rounded-2xl py-1 px-2 text-white ">
                  On Sale
                </span>
              )}
            </h2>
          </div>

          <ul className="p-8 grid grid-cols-4 gap-8">
            {windowMetadataArray?.map((v, i) => (
              <WindowNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
