pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract BiddingMap {
    mapping(address => mapping(uint256 => uint256)) module_points;
    mapping(address => uint256[]) student_to_mod;
    mapping(uint256 => address[]) mod_to_student;
    address owner = msg.sender;

    // --------------------------- Functions for bidding mod ---------------------------------------
    function bidMod(address student, uint256 mod, uint256 amt) public {
        module_points[student][mod] = amt;
        student_to_mod[student].push(mod);
        mod_to_student[mod].push(student);
    }

    // --------------------------- Functions for unbidding mod ---------------------------------------
    function unbidMod(address student, uint256 mod) public {
        uint256 i = find_mod(student, mod);
        uint256 j = find_student(student, mod);
        removeModByIndex(student, i);
        removeStudentByIndex(mod, j);
        module_points[student][mod] = 0;
    }

    // Find mod index for the student in student_to_mod mapping
    function find_mod(address student, uint256 mod) internal view returns(uint256) {
        uint i = 0;
        while (student_to_mod[student][i] != mod) {
            i++;
        }
        return i;
    }

    // Find studen index for the mod in mod_to_student mapping
    function find_student(address student, uint256 mod) internal view returns(uint256) {
        uint i = 0;
        while (mod_to_student[mod][i] != student) {
            i++;
        }
        return i;
    }

    // Remove mod for the student 
    function removeModByIndex(address student, uint256 i) public payable {
        while (i<student_to_mod[student].length-1) {
            student_to_mod[student][i] = student_to_mod[student][i+1];
            i++;
        }
        student_to_mod[student].pop();
    }

    // Remove student for the mod
    function removeStudentByIndex(uint256 mod, uint256 i) public payable {
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