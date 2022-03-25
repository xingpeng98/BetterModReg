pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract BiddingMap {
    mapping(address => mapping(uint256 => uint256)) module_points;
    mapping(address => uint256[]) student_to_mod;
    mapping(uint256 => address[]) mod_to_student;
    address owner = msg.sender;

    // Owner pattern modifier
    modifier onlyOwner {
        require(tx.origin == owner, "Only owner can call this function");
        _;
    }

    // --------------------------- Functions for bidding mod ---------------------------------------
    function bidMod(uint256 mod, uint256 amt) public {
        module_points[tx.origin][mod] = amt;
        student_to_mod[tx.origin].push(mod);
        mod_to_student[mod].push(tx.origin);
    }

    // --------------------------- Functions for unbidding mod ---------------------------------------
    function unbidMod(uint256 mod) public {
        uint256 i = find_mod(mod);
        uint256 j = find_student(mod);
        removeModByIndex(i);
        removeStudentByIndex(j, mod);
        module_points[tx.origin][mod] = 0;
    }

    // Find mod index for the student in student_to_mod mapping
    function find_mod(uint256 mod) internal view returns(uint256) {
        uint i = 0;
        while (student_to_mod[tx.origin][i] != mod) {
            i++;
        }
        return i;
    }

    // Find studen index for the mod in mod_to_student mapping
    function find_student(uint256 mod) internal view returns(uint256) {
        uint i = 0;
        while (mod_to_student[mod][i] != tx.origin) {
            i++;
        }
        return i;
    }

    // Remove student for the mod 
    function removeModByIndex(uint256 i) internal {
        while (i<student_to_mod[tx.origin].length-1) {
            student_to_mod[tx.origin][i] = student_to_mod[tx.origin][i+1];
            i++;
        }
        student_to_mod[tx.origin].pop();
    }

    // Remove mod for the student
    function removeStudentByIndex(uint256 i, uint256 mod) internal {
        while (i<mod_to_student[mod].length-1) {
            mod_to_student[mod][i] = mod_to_student[mod][i+1];
            i++;
        }
        mod_to_student[mod].pop();
    }

    // --------------------------- Getter functions ---------------------------------------
    function getStudentBid(address student, uint256 mod) public view returns(uint256) {
        return module_points[student][mod];
    }

    function getStudentMods(address student) public view returns(uint256[] memory) {
        return student_to_mod[student];
    }

    function getModStudents(uint256 mod) public view returns(address[] memory) {
        return mod_to_student[mod];
    }
}