// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract MintPartsNFT is ERC1155, Ownable, ERC1155Holder {
    string public name;
    string public symbol;
    string metadataURI;
    uint maxTokenId;
    uint tokenId;



    constructor(string memory _name, string memory _symbol, uint _maxTokenId) ERC1155("") Ownable(msg.sender) {
        name = _name;
        symbol = _symbol;
        maxTokenId = _maxTokenId;
        tokenId = 0;
    }

      function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Holder) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    //지붕, 문, 벽 등 각 요소 한 번에 민팅
    function mintPartsNFT( uint _amount, address _salePartsContract) public {
        tokenId = tokenId + 1;

        _mint(address(this), tokenId, _amount, ""); // 초기 발행 소유권은 이 컨트랙트에 있고,
       
        _setApprovalForAll(address(this), _salePartsContract, true); // 발행과 동시에 sale에 approval 줌
    }

    function setMetadataURI(string memory _metadataURI) public onlyOwner {
        metadataURI = _metadataURI;
    }

    //사실상 발행할 때 얘만 실행함
    function batchMintPartsNFT(uint[] memory _amount, string memory _metadataURI, address _salePartsContract) public {
        for(uint i = 0; i < _amount.length; i++) {
            mintPartsNFT(_amount[i], _salePartsContract);
        }
        
        setMetadataURI(_metadataURI);
    }

    

    function uri(uint _tokenId) public override view returns(string memory) {
        return string(abi.encodePacked(metadataURI, '/', Strings.toString(_tokenId), '.json'));
    }

    function burn(address _account, uint _tokenId, uint _value) public {
        _burn(_account, _tokenId, _value);
    }
   

}