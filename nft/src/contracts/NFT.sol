pragma solidity 0.5.16;

import "./ERC721Full.sol";

contract NFT is ERC721Full {
  string[] public names;
  string[] public paths;
  string[] public worths;
  string[] public descriptions;

  
  constructor() ERC721Full("NFT", "NFT") public {
  }


  function mint(string memory _name,string memory _path,string memory _worth,string memory _description) public {

    uint _id = names.push(_name);
    paths.push(_path);
    worths.push(_worth);
    descriptions.push(_description);
    _mint(msg.sender, _id);
   
  }

}
