import { FC, useEffect } from "react";
import { useOutletContext } from "react-router";
import { NFTMetadata, OutletContext } from "../types";
import metadata from "../abis/_metadata.json";

interface BuildCustomHouseProps {
  selectedChimney: number;
  chimneyMetadataArray: NFTMetadata[];
  selectedRoof: number;
  roofMetadataArray: NFTMetadata[];
  selectedDoor: number;
  doorMetadataArray: NFTMetadata[];
  selectedWall: number;
  wallMetadataArray: NFTMetadata[];
  selectedWindow: number;
  windowMetadataArray: NFTMetadata[];
}

const BuildCustomHouse: FC<BuildCustomHouseProps> = ({
  selectedChimney,
  chimneyMetadataArray,
  selectedRoof,
  roofMetadataArray,
  selectedDoor,
  doorMetadataArray,
  selectedWall,
  wallMetadataArray,
  selectedWindow,
  windowMetadataArray,
}) => {
  const {
    mintChimneyNFTContract,
    mintDoorNFTContract,
    mintHouseNFTContract,
    mintRoofNFTContract,
    mintWallNFTContract,
    mintWindowNFTContract,
    transferHouseNFTContract,
    salePartsNFTContract,
    account,
  } = useOutletContext<OutletContext>();

  const chimney = ["", "DarkGreen", "Red"];
  const door = ["", "Mustard", "Red"];
  const roof = [
    "",
    "DarkBlue",
    "Grapefruit",
    "Lemon",
    "SkyBlue",
    "SpringGreen",
  ];
  const wall = ["", "Cyan", "Green", "Orange", "Purple", "YellowCyan"];
  const window = ["", "BlueCyan", "PurpleGreen"];

  //   useEffect(() => {
  //     console.log(chimneyMetadataArray[selectedChimney - 1].image);
  //   }, [selectedChimney]);

  const transferHouseNFT = async (
    houseId: number,
    chimneyId: number,
    doorId: number,
    roofId: number,
    wallId: number,
    windowId: number
  ) => {
    try {
      const response = await mintHouseNFTContract.methods
        //@ts-expect-errors
        .reveal(houseId)
        .send({ from: account });
      // console.log(id);
      //reveal

      //transfer
      const response2 = await transferHouseNFTContract.methods
        //@ts-expect-errors
        .transferHouseNFT(mintHouseNFTContract, houseId)
        .send({ from: account });

      const response3 = await mintChimneyNFTContract.methods
        //@ts-expect-errors
        .burn(account, chimneyId, 1)
        .send({ from: account });

      const response4 = await mintDoorNFTContract.methods
        //@ts-expect-errors
        .burn(account, doorId, 1)
        .send({ from: account });

      const response5 = await mintRoofNFTContract.methods
        //@ts-expect-errors
        .burn(account, roofId, 1)
        .send({ from: account });

      const response6 = await mintWallNFTContract.methods
        //@ts-expect-errors
        .burn(account, wallId, 1)
        .send({ from: account });

      const response7 = await mintWindowNFTContract.methods
        //@ts-expect-errors
        .burn(account, windowId, 1)
        .send({ from: account });

      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickTransferHouseNFT = () => {
    //선택한 요소의 정보 받아서,
    // console.log(selectedChimney);
    // console.log(selectedDoor);
    // console.log(selectedRoof);
    // console.log(selectedWall);
    // console.log(selectedWindow);

    //일치하는 houseNFT 찾고,

    // console.log(metadata[0].attributes[0].value);//wall
    // console.log(metadata[0].attributes[1].value); //door
    // console.log(metadata[0].attributes[2].value); //window
    // console.log(metadata[0].attributes[3].value); //roof
    // console.log(metadata[0].attributes[4].value); //chimney

    let id = 0;

    const temp = metadata.filter((v, i) => {
      if (
        chimney[selectedChimney] == v.attributes[4].value &&
        door[selectedDoor] == v.attributes[1].value &&
        roof[selectedRoof] == v.attributes[3].value &&
        wall[selectedWall] == v.attributes[0].value &&
        window[selectedWindow] == v.attributes[2].value
      ) {
        return v;
      }
    });

    id = temp[0].edition;

    transferHouseNFT(
      id,
      selectedChimney,
      selectedDoor,
      selectedRoof,
      selectedWall,
      selectedWindow
    );

    //해당 houseNFT 소유권 나의 지갑에서 상대 지갑으로 이전
  };

  return (
    <div className="flex flex-col">
      <div className="text-2xl mb-24 font-bold p-4">
        Build Your Own House and Get the NFT
      </div>
      <div className="flex items-center  justify-center">
        {selectedChimney === 0 ? (
          <div className="bg-white text-green-900 border-2  border-blue-500 font-semibold p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2 flex justify-center items-center ">
            Select Chimney
          </div>
        ) : (
          <div className="bg-white text-green-900 border-2 border-blue-500 p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2">
            <div>
              {chimneyMetadataArray[selectedChimney - 1].name.substring(6)}
            </div>
            <img
              src={chimneyMetadataArray[selectedChimney - 1].image}
              alt={chimneyMetadataArray[selectedChimney - 1].name}
            />
          </div>
        )}
        <div className="text-2xl font-bold ml-2">+</div>
        {selectedDoor === 0 ? (
          <div className="bg-white text-green-900 border-2  border-blue-500 font-semibold p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2 flex justify-center items-center ">
            Select Door
          </div>
        ) : (
          <div className="bg-white text-green-900 border-2 border-blue-500 p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2">
            <div>{doorMetadataArray[selectedDoor - 1].name.substring(6)}</div>
            <img
              src={doorMetadataArray[selectedDoor - 1].image}
              alt={doorMetadataArray[selectedDoor - 1].name}
            />
          </div>
        )}
        <div className="text-2xl font-bold ml-2">+</div>
        {selectedRoof === 0 ? (
          <div className="bg-white text-green-900 border-2  border-blue-500 font-semibold p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2 flex justify-center items-center ">
            Select Roof
          </div>
        ) : (
          <div className="bg-white text-green-900 border-2 border-blue-500 p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2">
            <div>{roofMetadataArray[selectedRoof - 1].name.substring(6)}</div>
            <img
              src={roofMetadataArray[selectedRoof - 1].image}
              alt={roofMetadataArray[selectedRoof - 1].name}
            />
          </div>
        )}
        <div className="text-2xl font-bold ml-2">+</div>
        {selectedWall === 0 ? (
          <div className="bg-white text-green-900 border-2  border-blue-500 font-semibold p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2 flex justify-center items-center ">
            Select Wall
          </div>
        ) : (
          <div className="bg-white border-2 border-blue-500 p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2">
            <div>{wallMetadataArray[selectedWall - 1].name.substring(6)}</div>
            <img
              src={wallMetadataArray[selectedWall - 1].image}
              alt={wallMetadataArray[selectedWall - 1].name}
            />
          </div>
        )}
        <div className="text-2xl font-bold ml-2">+</div>
        {selectedWindow === 0 ? (
          <div className="bg-white text-green-900 border-2  border-blue-500 font-semibold p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2 flex justify-center items-center ">
            Select Window
          </div>
        ) : (
          <div className="bg-white border-2 border-blue-500 p-1 w-[160px] h-[160px] rounded-3xl mt-2 ml-2">
            <div>
              {windowMetadataArray[selectedWindow - 1].name.substring(6)}
            </div>
            <img
              src={windowMetadataArray[selectedWindow - 1].image}
              alt={windowMetadataArray[selectedWindow - 1].name}
            />
          </div>
        )}
        <div className="text-2xl font-bold ml-2">=</div>
        <button
          onClick={onClickTransferHouseNFT}
          className="bg-blue-400 ml-2 p-4 rounded-2xl text-xl font-bold text-white"
        >
          Mint NFT
        </button>
      </div>
    </div>
  );
};

export default BuildCustomHouse;
