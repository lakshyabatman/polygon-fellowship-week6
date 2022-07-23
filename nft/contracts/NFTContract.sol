// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTContract is ERC721 {

    using Counters for Counters.Counter;
    uint256 public saleSize;


    uint256 public mintingFees; 

    string private _baseTokenURI;

    Counters.Counter private _tokenIds;

    mapping (uint256 => string) private _tokenURIs;

    constructor(uint256 _saleSize, uint256 _mintingFees, string memory BaseTokenURI) public ERC721("GuyWithASmirk", "GWAK") {
        _baseTokenURI = BaseTokenURI;
        mintingFees = _mintingFees;
        saleSize = _saleSize;

    }

    function baseTokenURI() view public returns (string memory) {
        return _baseTokenURI;
    }

     function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }


    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return _tokenURIs[tokenId];
        
    }


    function mint() public payable {

        uint256 newItemId = _tokenIds.current();
        
        require(newItemId<saleSize, "all NFT sold out");
        require(msg.value >=mintingFees, "less fees");
        string memory finalTokenUri = string(
            abi.encodePacked(baseTokenURI(),Strings.toString(newItemId),".json") 
        );
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenUri);
        _tokenIds.increment();
        
    }

}