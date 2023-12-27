import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";

import { NFTMetadata, OutletContext } from "../types";
import NFTCard from "../components/NFTCard";
import MyNFTCard from "../components/MyNFTCard/MyNFTCard";
import BuildCustomHouse from "../components/BuildCustomHouse";
import MyChimneyNFTCard from "../components/MyNFTCard/MyChimneyNFTCard";
import MyRoofNFTCard from "../components/MyNFTCard/MyRoofNFTCard";
import MyDoorNFTCard from "../components/MyNFTCard/MyDoorNFTCard";
import MyWallNFTCard from "../components/MyNFTCard/MyWallNFTCard";
import MyWindowNFTCard from "../components/MyNFTCard/MyWindowNFTCard";

const My: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const [selectedChimney, setSelectedChimney] = useState<number>(0);
  const [isSelectedChimney, setIsSelectedChimney] = useState<boolean[]>([
    false,
    false,
  ]);

  const [selectedDoor, setSelectedDoor] = useState<number>(0);
  const [isSelectedDoor, setIsSelectedDoor] = useState<boolean[]>([
    false,
    false,
  ]);

  const [selectedRoof, setSelectedRoof] = useState<number>(0);
  const [isSelectedRoof, setIsSelectedRoof] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [selectedWall, setSelectedWall] = useState<number>(0);
  const [isSelectedWall, setIsSelectedWall] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [selectedWindow, setSelectedWindow] = useState<number>(0);
  const [isSelectedWindow, setIsSelectedWindow] = useState<boolean[]>([
    false,
    false,
  ]);

  const {
    mintChimneyNFTContract,
    mintDoorNFTContract,
    mintHouseNFTContract,
    mintRoofNFTContract,
    mintWallNFTContract,
    mintWindowNFTContract,
    account,
  } = useOutletContext<OutletContext>();

  const getMyHouseNFTs = async () => {
    try {
      if (!mintHouseNFTContract || !account) return;

      const balance = await mintHouseNFTContract.methods
        //@ts-expect-errors
        .balanceOf(account)
        .call();

      console.log(balance);

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await mintHouseNFTContract.methods
          //@ts-expect-error
          .tokenOfOwnerByIndex(account, i)
          .call();

        const metadataURI: string = await mintHouseNFTContract.methods
          //@ts-expect-error
          .tokenURI(Number(tokenId))
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: Number(tokenId) }); // 원래 tokenId로 이름 같아서 줄일 수 있는데, 형변환 해야 하므로 .
      }

      setHouseMetadataArray(temp);

      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyChimneyNFTs = async () => {
    try {
      if (!mintChimneyNFTContract || !account) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 2; i++) {
        const balance: number = await mintChimneyNFTContract.methods
          //@ts-expect-errors
          .balanceOf(account, i + 1)
          .call();

        console.log(Number(balance));

        if (Number(balance) > 0) {
          const metadataURI: string = await mintChimneyNFTContract.methods
            //@ts-expect-error
            .uri(Number(i + 1))
            .call();

          const response = await axios.get(metadataURI);

          temp.push({ ...response.data, tokenId: Number(i + 1) }); // 원래 tokenId로 이름 같아서 줄일 수 있는데, 형변환 해야 하므로 .
        }
      }

      setChimneyMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyDoorNFTs = async () => {
    try {
      if (!mintDoorNFTContract || !account) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 2; i++) {
        const balance: number = await mintDoorNFTContract.methods
          //@ts-expect-errors
          .balanceOf(account, i + 1)
          .call();

        if (balance > 0) {
          const metadataURI: string = await mintDoorNFTContract.methods
            //@ts-expect-error
            .uri(Number(i + 1))
            .call();

          const response = await axios.get(metadataURI);

          temp.push({ ...response.data, tokenId: Number(i + 1) }); // 원래 tokenId로 이름 같아서 줄일 수 있는데, 형변환 해야 하므로 .
        }
      }

      setDoorMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyRoofNFTs = async () => {
    try {
      if (!mintRoofNFTContract || !account) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 5; i++) {
        const balance: number = await mintRoofNFTContract.methods
          //@ts-expect-errors
          .balanceOf(account, i + 1)
          .call();

        if (balance > 0) {
          const metadataURI: string = await mintRoofNFTContract.methods
            //@ts-expect-error
            .uri(Number(i + 1))
            .call();

          const response = await axios.get(metadataURI);

          temp.push({ ...response.data, tokenId: Number(i + 1) }); // 원래 tokenId로 이름 같아서 줄일 수 있는데, 형변환 해야 하므로 .
        }
      }

      setRoofMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyWallNFTs = async () => {
    try {
      if (!mintWallNFTContract || !account) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 5; i++) {
        const balance: number = await mintWallNFTContract.methods
          //@ts-expect-errors
          .balanceOf(account, i + 1)
          .call();

        if (balance > 0) {
          const metadataURI: string = await mintWallNFTContract.methods
            //@ts-expect-error
            .uri(Number(i + 1))
            .call();

          const response = await axios.get(metadataURI);

          temp.push({ ...response.data, tokenId: Number(i + 1) }); // 원래 tokenId로 이름 같아서 줄일 수 있는데, 형변환 해야 하므로 .
        }
      }

      setWallMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyWindowNFTs = async () => {
    try {
      if (!mintWindowNFTContract || !account) return;

      let temp: NFTMetadata[] = [];

      for (let i = 0; i < 2; i++) {
        const balance: number = await mintWindowNFTContract.methods
          //@ts-expect-errors
          .balanceOf(account, i + 1)
          .call();

        if (balance > 0) {
          const metadataURI: string = await mintWindowNFTContract.methods
            //@ts-expect-error
            .uri(Number(i + 1))
            .call();

          const response = await axios.get(metadataURI);

          temp.push({ ...response.data, tokenId: Number(i + 1) }); // 원래 tokenId로 이름 같아서 줄일 수 있는데, 형변환 해야 하므로 .
        }
      }

      setWindowMetadataArray(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyHouseNFTs();
    getMyChimneyNFTs();
    getMyDoorNFTs();
    getMyRoofNFTs();
    getMyWallNFTs();
    getMyWindowNFTs();
  }, [mintHouseNFTContract, account, mintChimneyNFTContract]);

  return (
    <div className=" grow ">
      <div className=" h-[600px] overflow-y-auto">
        <div>
          <div className=" text-center py-8 ">
            <h1 className="font-bold text-2xl text-green-900">Chimney NFTs</h1>
          </div>
          <ul className="p-8 grid grid-cols-4 gap-8">
            {chimneyMetadataArray?.map((v, i) => (
              <MyChimneyNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
                saleStatus={saleStatus}
                selectedChimney={selectedChimney!}
                isSelectedChimney={isSelectedChimney}
                setIsSelectedChimney={setIsSelectedChimney}
                setSelectedChimney={setSelectedChimney}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className=" text-center py-8 ">
            <h1 className="font-bold text-2xl text-green-900">Door NFTs</h1>
          </div>
          <ul className="p-8 grid grid-cols-4 gap-8">
            {doorMetadataArray?.map((v, i) => (
              <MyDoorNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
                saleStatus={saleStatus}
                selectedDoor={selectedDoor!}
                isSelectedDoor={isSelectedDoor}
                setIsSelectedDoor={setIsSelectedDoor}
                setSelectedDoor={setSelectedDoor}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className=" text-center py-8 ">
            <h1 className="font-bold text-2xl text-green-900">Roof NFTs</h1>
          </div>
          <ul className="p-8 grid grid-cols-4 gap-8">
            {roofMetadataArray?.map((v, i) => (
              <MyRoofNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
                saleStatus={saleStatus}
                selectedRoof={selectedRoof!}
                isSelectedRoof={isSelectedRoof}
                setIsSelectedRoof={setIsSelectedRoof}
                setSelectedRoof={setSelectedRoof}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className=" text-center py-8 ">
            <h1 className="font-bold text-2xl text-green-900">Wall NFTs</h1>
          </div>
          <ul className="p-8 grid grid-cols-4 gap-8">
            {wallMetadataArray?.map((v, i) => (
              <MyWallNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
                saleStatus={saleStatus}
                selectedWall={selectedWall!}
                isSelectedWall={isSelectedWall}
                setIsSelectedWall={setIsSelectedWall}
                setSelectedWall={setSelectedWall}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className=" text-center py-8 ">
            <h1 className="font-bold text-2xl text-green-900">Window NFTs</h1>
          </div>
          <ul className="p-8 grid grid-cols-4 gap-8">
            {windowMetadataArray?.map((v, i) => (
              <MyWindowNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
                saleStatus={saleStatus}
                selectedWindow={selectedWindow!}
                isSelectedWindow={isSelectedWindow}
                setIsSelectedWindow={setIsSelectedWindow}
                setSelectedWindow={setSelectedWindow}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className=" text-center py-8 ">
            <h1 className="font-bold text-2xl text-green-900">House NFTs</h1>
          </div>
          <ul className="p-8 grid grid-cols-4 gap-8">
            {houseMetadataArray?.map((v, i) => (
              <MyNFTCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
                saleStatus={saleStatus}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-gradient-to-b from-green-400 to-white h-[400px] rounded-3xl ">
        <BuildCustomHouse
          selectedChimney={selectedChimney}
          chimneyMetadataArray={chimneyMetadataArray}
          selectedRoof={selectedRoof}
          roofMetadataArray={roofMetadataArray}
          selectedDoor={selectedDoor!}
          doorMetadataArray={doorMetadataArray}
          selectedWall={selectedWall!}
          wallMetadataArray={wallMetadataArray}
          selectedWindow={selectedWindow!}
          windowMetadataArray={windowMetadataArray}
        />
      </div>
    </div>
  );
};

export default My;

//
