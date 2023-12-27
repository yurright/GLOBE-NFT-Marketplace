// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './MintHouseNFT.sol';

contract SaleHouseNFT {

    mapping(uint => uint) public nftHousePrices;
    uint[] public onSaleHouseNFTs; //이건 배열 만든거임

    function setHouseForSaleNFT(address _mintHouseNFTAddress, uint _tokenId, uint _price)public payable{

        MintHouseNFT mintHouseNFTContract = MintHouseNFT(_mintHouseNFTAddress);
        address houseNFTOwner = mintHouseNFTContract.ownerOf(_tokenId);

        require(msg.sender == houseNFTOwner, "Caller is not NFT Owner.");
        require(_price > 0, "Price is zero or lower.");
        require(nftHousePrices[_tokenId] == 0, "This NFT is already on sale.");
        require(mintHouseNFTContract.isApprovedForAll(msg.sender, address(this)), "NFT owner did not approve token.");

       
        nftHousePrices[_tokenId] = _price;
        onSaleHouseNFTs.push(_tokenId); 

    }


    function purchaseHouseNFT(address _mintHouseNFTAddress, uint _tokenId) public payable {

        MintHouseNFT mintHouseNFTContract = MintHouseNFT(_mintHouseNFTAddress);
        address houseNFTOwner = mintHouseNFTContract.ownerOf(_tokenId); 

        require(msg.sender != houseNFTOwner, "Caller is NFT owner.");
        require(nftHousePrices[_tokenId] > 0, "This NFT not on sale.");
        require(nftHousePrices[_tokenId] <= msg.value);


        payable(houseNFTOwner).transfer(msg.value);
        mintHouseNFTContract.safeTransferFrom(houseNFTOwner, msg.sender, _tokenId);

        // nftHouseOnSale[_tokenId] = false;
        nftHousePrices[_tokenId] = 0;

        checkHouseZeroPrice();

    }

    function checkHouseZeroPrice() public {
        for(uint i = 0; i < onSaleHouseNFTs.length; i++) {
            if(nftHousePrices[onSaleHouseNFTs[i]] == 0) {
                onSaleHouseNFTs[i] = onSaleHouseNFTs[onSaleHouseNFTs.length - 1];
                onSaleHouseNFTs.pop();
            }
        }
    }

    function getOnSaleHouseNFTs() public  view returns(uint[] memory) {
        return onSaleHouseNFTs;
    } 

}