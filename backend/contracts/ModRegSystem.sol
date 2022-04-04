pragma solidity ^0.6.0;
import"./BiddingPoints.sol";
import"./Students.sol"; 
import"./Module.sol";
import"./BiddingMap.sol";

contract ModRegSystem {
    Students studentContract;
    Module moduleContract; 
    BiddingMap biddingMapContract;
    BiddingPoints BP; 
    address _owner = msg.sender;
    uint256 roundStart = block.timestamp;  
    uint256 roundEnd = roundStart + 1 days; 
    uint256 penalty = 50; 
    // Account for bonus point in bidding
    uint256 bonus = 240; // max bonus is 240, with decay of 1 point every 6 minutes    
    bool roundActive = true;

    constructor(Students studentAddress, Module moduleAddress, BiddingMap biddingMapAddress, BiddingPoints bpAddress) public {
        studentContract = studentAddress;
        moduleContract = moduleAddress;
        biddingMapContract = biddingMapAddress;
        BP = bpAddress; 
    }

    modifier ownerOnly() {
        require(msg.sender == _owner); // Ensure only Modreg System can end round and handle allocation
        _;
    }

    // Allocate points to all student accounts  
    function allocatePoints() public ownerOnly { 
        uint256 basePoints = 900; 
        uint256 seniorityPoints = 50; // To be confirmed 
        for (uint i = 0; i < studentContract.get_numStudents(); i++) {
            uint256 pointsAllocated = basePoints + (seniorityPoints * studentContract.get_seniority(i)); // Year 4 gets 1100 points, 3 additional rebids
            BP.transferCredit(studentContract.get_address(i), pointsAllocated);
        }
    }

    function ceil(uint a, uint m) public pure returns (uint) {
        return ((a + m - 1) / m) * m;
    }
    
    function bid (uint256 id, uint256 mod, uint256 points) public {
        require(roundActive == true, "Bidding has not started yet");
        require(BP.checkCredit(msg.sender) >= points, "Not enough points for bidding"); 
        biddingMapContract.bidMod(msg.sender, mod, points);
        if(studentContract.check_firstBid(id) == true) {
            uint256 time_elapsed = block.timestamp - roundStart; // in seconds
            uint256 bonus_points = bonus - ceil((time_elapsed / 360), 1);
            BP.transferCreditFrom(address(this), msg.sender, bonus_points);
            studentContract.set_firstBid(id);
        }
    }

    function cancelBid (uint256 mod) public {
        require(roundActive == true, "Bidding has not started yet");
        require((biddingMapContract.getStudentBid(msg.sender, mod) - penalty) > 0, "Not enough points to cancel bid!");
        // Penalization 
        BP.transferCreditFrom(msg.sender, address(this), (biddingMapContract.getStudentBid(msg.sender, mod) - penalty));
        biddingMapContract.unbidMod(msg.sender, mod);    
    }

    function checkMinimumBid (uint256 mod) public view returns (uint256) {
        require(roundActive == true, "Bidding has not started yet");
        return moduleContract.check_minimum_bid(mod);
    }

    function checkModuleRanking (uint256 mod) public view returns (uint256) {
        require(roundActive == true, "Bidding has not started yet");
        return moduleContract.get_ranking(mod); 
    }

    function checkAllRankings () public view returns (uint256[] memory, uint256[] memory) {
        require(roundActive == true, "Bidding has not started yet");
        return moduleContract.check_ranking(biddingMapContract.getStudentMods(msg.sender));
    }

    function allocateModules () public ownerOnly {
        require(roundActive == true, "Bidding has not started yet");
        require(block.timestamp >= roundEnd); 
        roundActive = false; 
        for (uint i = 0; i < studentContract.get_numStudents(); i++) {
            address studentAddress = studentContract.get_address(i);
            uint256[] memory studentMods = biddingMapContract.getStudentMods(studentAddress);
            uint256 refundPoints = 0;
            for (uint j = 0; j < studentMods.length; j++) {
                if (moduleContract.get_ranking(studentMods[j]) > moduleContract.getModuleQuota(studentMods[j])) {
                    refundPoints += biddingMapContract.getStudentBid(studentAddress, studentMods[j]);
                    biddingMapContract.removeModByIndex(studentAddress, studentMods[j]);
                } 
            }
            if (refundPoints != 0) {
                BP.transferCreditFrom(address(this), studentAddress, refundPoints);
            }
        } 
    }  
}