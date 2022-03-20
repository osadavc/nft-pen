// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CodePenNFT is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721("CodePenNFT", "CPN") {}

  mapping(string => uint8) existingURIs;

  function _baseURI() internal pure override returns (string memory) {
    return "ipfs://";
  }

  function payToMint(address recipient, string memory metadataURI)
    public
    payable
    returns (uint256)
  {
    require(existingURIs[metadataURI] != 1, "NFT Already Minted");
    require(msg.value >= 0.0005 ether, "Not Enough ETH");

    uint256 newItemId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    existingURIs[metadataURI] = 1;

    _mint(recipient, newItemId);
    _setTokenURI(newItemId, metadataURI);

    return newItemId;
  }

  function isContentOwned(string memory uri) public view returns (bool) {
    return existingURIs[uri] == 1;
  }

  function nftCount() public view returns (uint256) {
    return _tokenIdCounter.current();
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }
}
