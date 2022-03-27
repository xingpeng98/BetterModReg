pragma solidity ^0.6.0;

import "./BiddingMap.sol";
contract Module{

     BiddingMap mapping_contract;


    struct module{
        uint256 module_code;
        bytes32 major;
        uint256 student_quota;
    }



    mapping(uint256 => module) public modules;

    uint256 public numModules = 0;

    constructor(BiddingMap bidding_map_address) public {
        mapping_contract = bidding_map_address;
        
        
    }

    function add(
        uint256 module_code,
        bytes32 major,
        uint256 quota
    ) public returns(uint256) {
    

        module memory newModule = module(
            module_code,
            major,
            quota 
        );

        numModules++;
        modules[module_code] = newModule; //commit to state variable
        return module_code;   
    }

// bidderOnly aims to check if the msg.sender is inside the mapping 
    modifier bidderOnly(uint256 module_code) {
        uint256 bids = mapping_contract.getStudentBid(tx.origin,module_code);
        require(bids!=0, "Student did not bid for this module");
        _;
    }

    function check_minimum_bid(uint256 module_code) view public bidderOnly(module_code) returns (uint256){

        uint256 minBids = 1000;

        address[] memory students=mapping_contract.getModStudents(module_code);




        for(uint i = 0; i < students.length;  i++) {
            address bidder = students[i];
            uint256 bids = mapping_contract.getStudentBid(bidder, module_code);

            if(bids < minBids) {
                
                minBids = bids;
            }
        }

        return minBids;

    }

  // Get ranking in a module. 
    function get_ranking(uint256 module_code) public view bidderOnly(module_code) returns (uint256){



        address[] memory students = mapping_contract.getModStudents(module_code);
       

        
        // Sort ranking 
        for(uint i =0;i<students.length;i++){
            for(uint j =i+1;j< students.length ;j++){
                address bidder_i = students[i];
                address bidder_j = students[j];
                uint256 i_bids=mapping_contract.getStudentBid(bidder_i,module_code);
                uint256 j_bids=mapping_contract.getStudentBid(bidder_j,module_code);
                if( i_bids < j_bids)
                {
                    address temp= students[j];
                    students[j]=students[i];
                    students[i] = temp;

                }

            }
        }
        // Get ranking
        address sender = tx.origin;
        uint256 rank=0;

        for(uint i = 0; i < students.length;  i++) {
            if(students[i] == sender) {
                
                rank=i;
            }
        }

        return rank;

    }

    // get ranking for multiple modules

    function check_ranking(uint256[] memory selected_modules)  public view returns(uint256[] memory, uint256[] memory){

        uint256 l = selected_modules.length;
        uint256[] memory rankings = new uint256[](l);


         for(uint i = 0; i < selected_modules.length;  i++) {

             uint256 rank= get_ranking(selected_modules[i]);
             rankings[i] = rank;
    
        }

        return (rankings, selected_modules);


    }

    function get_numModules() public view returns(uint256) {
        return numModules;
    }

    function getModuleQuota(uint256 module_code) public view returns (uint256) {
        return modules[module_code].student_quota;
    }
}