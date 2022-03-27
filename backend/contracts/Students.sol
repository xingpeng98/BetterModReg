pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract Students {
    
    enum studentState { bidding, notBidding }

    // TODO: Add events for bidding etc.
    
    struct student {
        address addr;
        string name;
        string username;
        string password;
        string email;
        uint8 seniority;
        string major;
        string minor;
        uint256 totalPoints;
        uint256 remainingPoints;
        bool firstBid;
        mapping(string => uint256) modulePoints;
    }
    
    uint256 public numStudents = 0;
    mapping(uint256 => student) public students;
    mapping(string => uint8) public createdStudents;

    function addStudent(
        string memory name,
        string memory username,
        string memory password,
        string memory email,
        uint8 seniority,
        string memory major,
        string memory minor,
        uint256 totalPoints
    ) public payable {
        // require student not already added
        require(createdStudents[username] != 0, "Student already added");

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
            totalPoints,
            totalPoints,
            true
        );
        
        students[numStudents] = newStudent;
        numStudents++;
    }

    /** Utility functions */
    function bidMod(uint256 id, string memory moduleCode, uint256 points) public payable {
        // rebidding penalty to be checked by modreg system (or i can put a function here 
        // in this contract to check)
        require(points < students[id].remainingPoints, "Not enough points");
        if (students[id].modulePoints[moduleCode] == 0) {
            students[id].modulePoints[moduleCode] = points;
            students[id].remainingPoints = students[id].remainingPoints - points;
        } else {
            students[id].remainingPoints = students[id].remainingPoints + students[id].modulePoints[moduleCode] - points;
            students[id].modulePoints[moduleCode] = points;
        }
    }

    function unbidMod(uint256 id, string memory moduleCode) public payable {
        require(students[id].modulePoints[moduleCode] > 0, "Cannot unbid a module that you have not bidded.");
        students[id].remainingPoints = students[id].remainingPoints + students[id].modulePoints[moduleCode];
        students[id].modulePoints[moduleCode] = 0;

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

    function get_totalPoints(uint256 id) public view returns(uint256) {
        return students[id].totalPoints;
    }

    function get_remainingPoints(uint256 id) public view returns(uint256) {
        return students[id].remainingPoints;
    }

    function get_modulePoints(uint256 id, string memory module) public view returns(uint256) {
        return students[id].modulePoints[module];
    }
    
}
