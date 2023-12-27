// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


//기성품 집 NFT 대량 발행 400개
contract MintHouseNFT is ERC721Enumerable, Ownable {
    string metadataURI;
    uint maxSupply;
    string notRevealedURI;
    mapping(uint => bool) public isRevealed;


    constructor(string memory _name, string memory _notRevealedURI, string memory _symbol, uint _maxSupply, string memory _metadataURI) ERC721(_name, _symbol) Ownable(address(this)) {
        maxSupply = _maxSupply;
        metadataURI = _metadataURI;
        notRevealedURI = _notRevealedURI;
    
        
    }

    function mintHouseNFT() public {
        require(totalSupply() < maxSupply, "No more mint.");

        uint tokenId = totalSupply() + 1;
        _mint(address(this), tokenId);
        isRevealed[tokenId] = false;
    }

    function batchMintHouseNFT(uint _amount, address _transferHouseContract) public {
        for(uint i = 0; i < _amount; i++) {
            mintHouseNFT();
        }
         _setApprovalForAll(address(this), _transferHouseContract, true);
    }

    function reveal( uint _tokenId) public {
        isRevealed[_tokenId] = true;
    }

    function tokenURI(uint _tokenId) public view override returns(string memory) {
        if(!isRevealed[_tokenId]) {
        return notRevealedURI;
        }
        
        return string(abi.encodePacked(metadataURI, '/', Strings.toString(_tokenId), '.json'));
    }

}