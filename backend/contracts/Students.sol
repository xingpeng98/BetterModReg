pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract Students {
    
    enum studentState { bidding, notBidding }

    // TODO: Add events for bidding etc.
    
    struct student {
        string name;
        string username;
        string password;
        string email;
        uint8 seniority;
        string major;
        string minor;
        uint256 totalPoints;
        uint256 remainingPoints;
        mapping(string => uint256) modulePoints;
        string[] modulesBidded;
        bool created;
    }
    
    uint256 public numStudents = 0;
    mapping(string => student) public students;

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
        require(!students[username].created, "Student already added");

        // new student object
        student memory newStudent = student(
            name,
            username,
            password,
            email,
            seniority,
            major,
            minor,
            totalPoints,
            totalPoints,
            new string[](0),
            true
        );
        
        numStudents++;
        students[username] = newStudent;
    }

    /** Utility functions */
    function bidMod(string memory username, string memory moduleCode, uint256 points) public payable {
        // rebidding penalty to be checked by modreg system (or i can put a function here 
        // in this contract to check)
        require(points < students[username].remainingPoints, "Not enough points");
        if (students[username].modulePoints[moduleCode] == 0) {
            students[username].modulesBidded.push(moduleCode);
        }
        students[username].modulePoints[moduleCode] = points;
        students[username].remainingPoints = students[username].remainingPoints - points;
    } 

    /** Getters */
    // TODO: Add some form of restriction for all calls

    function get_numStudents() public view returns(uint256) {
        return numStudents;
    }

    function get_name(string memory username) public view returns(string memory) {
        return students[username].name;
    }

    function get_password(string memory username) public view returns(string memory) {
        return students[username].password;
    }

    function get_seniority(string memory username) public view returns(uint8) {
        return students[username].seniority;
    }

    function get_major(string memory username) public view returns(string memory) {
        return students[username].major;
    }

    function get_minor(string memory username) public view returns(string memory) {
        return students[username].minor;
    }

    function get_totalPoints(string memory username) public view returns(uint256) {
        return students[username].totalPoints;
    }

    function get_remainingPoints(string memory username) public view returns(uint256) {
        return students[username].remainingPoints;
    }

    function get_modulesBidded(string memory username) public view returns(string[] memory) {
        return students[username].modulesBidded;
    }

    function get_modulePoints(string memory username, string memory module) public view returns(uint256) {
        return students[username].modulePoints[module];
    }
    
}
