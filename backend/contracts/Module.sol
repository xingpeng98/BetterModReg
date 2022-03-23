pragma solidity ^0.5.0;

contract Module{


    struct module{
        bytes32 module_code;
        bytes32 module_name;
        bytes32 major;
        uint256 student_quota;
        mapping(address => uint256) student_bidding_points;
        address[] bidders;
    }



    mapping(bytes32 => module) public modules;

    uint256 public numModules = 0;

    function add(
        bytes32 module_code,
        bytes32 module_name,
        bytes32 major
    ) public returns(bytes32) {
    
        address[] memory bidders;

        module memory newModule = module(
            module_code,
            module_name,
            major,
            100,  //temporary quota number 
            bidders
        );

        numModules++;
        modules[module_code] = newModule; //commit to state variable
        return module_code;   
    }

// bidderOnly aims to check if the msg.sender is inside the mapping 
    modifier bidderOnly( bytes32 module_code) {
        require(modules[module_code].student_bidding_points[msg.sender]!=0, "Student did not bid for this module");
        _;
    }

    function check_minimum_bid(bytes32 module_code) view public bidderOnly(module_code) returns (uint256){

        uint256 minBids = 1000;


        for(uint i = 0; i < modules[module_code].bidders.length;  i++) {
            address bidder = modules[module_code].bidders[i];
            uint256 bids = modules[module_code].student_bidding_points[bidder];

            if(bids < minBids) {
                
                minBids = bids;
            }
        }

        return minBids;

    }

  // Get ranking in a module. 
    function get_ranking(bytes32 module_code) internal view bidderOnly(module_code) returns (uint256){


        uint256 l = modules[module_code].bidders.length;
        address[] memory arr = new address[](l);
        //Populate temporary arr of student address

        for(uint i=0;i<l;i++){
            arr[i] = modules[module_code].bidders[i];
        }
        // Sort ranking 
        for(uint i =0;i<l;i++){
            for(uint j =i+1;j<l;j++){
                address bidder_i = arr[i];
                address bidder_j = arr[j];
                if(modules[module_code].student_bidding_points[bidder_i] > modules[module_code].student_bidding_points[bidder_j])
                {
                    address temp= arr[j];
                    arr[j]=arr[i];
                    arr[i] = temp;

                }

            }
        }
        // Get ranking
        address sender = msg.sender;
        uint256 rank=0;

        for(uint i = 0; i < arr.length;  i++) {
            if(arr[i] == sender) {
                
                rank=i;
            }
        }

        return rank;

    }

    // get ranking for multiple modules

    function check_ranking(bytes32[] memory selected_modules)  public view returns(uint256[] memory, bytes32[] memory){

        uint256 l = selected_modules.length;
        uint256[] memory rankings = new uint256[](l);


         for(uint i = 0; i < selected_modules.length;  i++) {

             uint256 rank= get_ranking(selected_modules[i]);
             rankings[i] = rank;
    
        }

        return (rankings, selected_modules);


    }



    function add_student(address student, uint256 bids , bytes module_code) public {

        modules[module_code].student_bidding_points[address]=bids;
        bidders.push(student);

    }

    function remove_student(address student, uint256 bids , bytes module_code) public {

        modules[module_code].student_bidding_points[address]=0;
       

    }

    function getModuleName( bytes32 module_code) public view returns (bytes32) {
        return modules[module_code].module_name;
    }

    function getModuleQuota( bytes32 module_code) public view returns (uint256) {
        return modules[module_code].student_quota;
    }



  




    


    








}


