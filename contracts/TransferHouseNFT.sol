// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './MintHouseNFT.sol';

contract TransferHouseNFT {

    constructor() {}


    function transferHouseNFT(address _mintHouseNFTContract, uint _tokenId) public {

         ERC721 mintHouseNFTContract = ERC721(_mintHouseNFTContract); 
         address nftOwner = mintHouseNFTContract.ownerOf(_tokenId);

        require(nftOwner == _mintHouseNFTContract, "Someone already releaved this NFT.");
        require(msg.sender != nftOwner, "Call is NFT owner.");
        
        mintHouseNFTContract.safeTransferFrom(nftOwner, msg.sender, _tokenId);

    }
}