pragma solidity ^0.6.0;

import "./ERC20.sol";

contract BiddingPoints {
    ERC20 erc20Contract;
    uint256 supplyLimit;
    uint256 currentSupply;
    address owner; 

    constructor() public {
        ERC20 e = new ERC20(); // Create new ERC20 contract instance 
        erc20Contract = e; // point to new instance 
        owner = msg.sender; 
        supplyLimit = 20000; 
    }

    modifier ownerOnly() {
        require(msg.sender == owner); // Ensure only Modreg System can mint points
        _;
    }

    function getCredit() public payable ownerOnly {
        uint256 amt = msg.value / 100000000000000; // 2ETH required to mint max points
        require(erc20Contract.totalSupply() + amt <= supplyLimit, "BP supply is not enough");
        erc20Contract.mint(msg.sender, amt); 
    }

    function checkCredit(address studentAddress) public view returns(uint256) {
        return erc20Contract.balanceOf(studentAddress); 
    }

    function transferCreditFrom(address from, address to, uint256 amt) public {
        erc20Contract.transferFrom(from, to, amt);
    }

    function transferCredit(address recipient, uint256 amt) public {
        require(erc20Contract.transfer(recipient, amt), "Failed to transfer");
    }

    function giveAllowance(address recipient, uint256 amt) public {
        erc20Contract.approve(recipient, amt);
    }
}