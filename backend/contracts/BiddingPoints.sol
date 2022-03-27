pragma solidity ^0.6.0;

import "./ERC20.sol";
import "./Students.sol";

contract BiddingPoints {
    ERC20 erc20Contract;
    Students studentContract;
    uint256 supplyLimit;
    uint256 currentSupply;
    address owner; 

    constructor() public {
        ERC20 e = new ERC20(); // Create new ERC20 contract instance 
        erc20Contract = e; // point to new instance 
        owner = msg.sender; 
        supplyLimit = 10000; 
    }

    modifier ownerOnly() {
        require(msg.sender == owner); // Ensure only Modreg System can mint points
        _;
    }

    function getCredit() public payable ownerOnly {
        uint256 amt = msg.value / 1000000000000000; // 10ETH required to mint max points
        require(erc20Contract.totalSupply() + amt < supplyLimit, "BP supply is not enough");
        erc20Contract.mint(msg.sender, amt); 
    }

    function checkCredit(address studentAddress) public view returns(uint256) {
        return erc20Contract.balanceOf(studentAddress); 
    }

    function transferCreditFrom(address from, address to, uint256 amt) public {
        erc20Contract.transferFrom(from, to, amt);
    }
}