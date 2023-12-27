// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './MintPartsNFT.sol';

contract SalePartsNFT {
    
    
function buyPartsNFT(address _mintPartsNFTContract,  uint _tokenId, address _beneficiary) public payable {

        ERC1155 mintPartsNFTContract = ERC1155(_mintPartsNFTContract); 
         

        require(mintPartsNFTContract.isApprovedForAll(_mintPartsNFTContract, address(this)), "NFT owner did not approve token.");
        require(mintPartsNFTContract.balanceOf(_mintPartsNFTContract, _tokenId) > 0 , "This NFT is sold out.");
        require(msg.value == 0.00001 ether, 'Only 0.00001 ether allowed to be transfered.');
        

        payable(_beneficiary).transfer(msg.value);

        mintPartsNFTContract.safeTransferFrom(_mintPartsNFTContract, msg.sender, _tokenId, 1, "");

    }

}