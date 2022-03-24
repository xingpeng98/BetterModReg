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

    function checkCredit() public view returns(uint256) {
        return erc20Contract.balanceOf(msg.sender); 
    }

    // Allocate points to all student accounts  
    function allocatePoints() public payable ownerOnly { 
        uint256 basePoints = 900; 
        uint256 seniorityPoints = 50; // To be confirmed 
        for (uint i = 0; i < studentContract.get_numStudents(); i++) {
            uint256 pointsAllocated = basePoints + (seniorityPoints * studentContract.get_seniority(i)); // Year 4 gets 1100 points, 3 additional rebids
            erc20Contract.transfer(studentContract.get_address(i), pointsAllocated);
        }
    }
}