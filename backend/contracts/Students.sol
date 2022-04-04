pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract Students {
    
    enum studentState { bidding, notBidding }
    
    struct student {
        address addr;
        string name;
        string username;
        string password;
        string email;
        uint8 seniority;
        string major;
        string minor;
        bool firstBid;
    }
    
    uint256 public numStudents = 0;
    mapping(uint256 => student) public students;
    mapping(address => uint8) public createdStudents;

    function addStudent(
        string memory name,
        string memory username,
        string memory password,
        string memory email,
        uint8 seniority,
        string memory major,
        string memory minor
    ) public payable {
        // require student not already added
        require(createdStudents[tx.origin] != 1, "Student already added");

        // new student object
        student memory newStudent = student(
            tx.origin,
            name,
            username,
            password,
            email,
            seniority,
            major,
            minor,
            true
        );
        
        students[numStudents] = newStudent;
        numStudents++;
        createdStudents[tx.origin] = 1;
    }

    /** Utility functions */
    function set_firstBid(uint256 id) public payable{
        students[id].firstBid = false;
    }

    /** Getters */
    // TODO: Add some form of restriction for all calls
    
    function check_firstBid(uint256 id) public view returns (bool) {
        return students[id].firstBid;
    }
    
    function get_numStudents() public view returns(uint256) {
        return numStudents;
    }

    function get_address(uint256 id) public view returns(address) {
        return students[id].addr;
    }

    function get_name(uint256 id) public view returns(string memory) {
        return students[id].name;
    }

    function get_password(uint256 id) public view returns(string memory) {
        return students[id].password;
    }

    function get_seniority(uint256 id) public view returns(uint8) {
        return students[id].seniority;
    }

    function get_major(uint256 id) public view returns(string memory) {
        return students[id].major;
    }

    function get_minor(uint256 id) public view returns(string memory) {
        return students[id].minor;
    }
    
}
