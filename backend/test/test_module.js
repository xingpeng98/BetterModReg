const _deploy_contracts = require("../migrations/2_deploy_contracts_test");
const truffleAssert = require('truffle-assertions');
var assert = require('assert');


var BiddingMap = artifacts.require("../contracts/BiddingMap.sol");
var Module = artifacts.require("../contracts/Module.sol");

contract('Module', function(accounts) {
    before(async () => {
        mapInstance = await BiddingMap.deployed();
        moduleInstance = await Module.deployed();
    });

 

    it('Test bid module', async() => {
        let stu_1_bid_1 = await mapInstance.bidMod(accounts[1], 1, 10, {from:accounts[1]});
        let stu_1_bid_2 = await mapInstance.bidMod(accounts[1], 2, 80, {from:accounts[1]});
        truffleAssert.eventEmitted(stu_1_bid_1, "bid");
        truffleAssert.eventEmitted(stu_1_bid_2, "bid");

        let stu1_mod1_bids = await mapInstance.getStudentBid.call(accounts[1], 1);
        assert.strictEqual(stu1_mod1_bids.toNumber(), 10, "Bids not save correctly");

        let stu1_mod2_bids = await mapInstance.getStudentBid.call(accounts[1], 2);
        assert.strictEqual(stu1_mod2_bids.toNumber(), 80, "Bids not save correctly");

        let stu_2_bid_1 = await mapInstance.bidMod(accounts[2], 1, 20, {from:accounts[1]});
        truffleAssert.eventEmitted(stu_2_bid_1, "bid");


        let stu2_mod1_bids = await mapInstance.getStudentBid.call(accounts[2], 1);
        assert.strictEqual(stu2_mod1_bids.toNumber(), 20, "Bids not save correctly");
       

    });



    it('Test add module', async() => {
        let add_mod_1=await moduleInstance.add(1, 200, {from: accounts[0]});
        let add_mod_2=await moduleInstance.add(2, 200, {from: accounts[0]});

                                                                    
        assert.notStrictEqual(
            add_mod_1,
            undefined,
            "Failed to add module 1"
        );

        assert.notStrictEqual(
            add_mod_2,
            undefined,
            "Failed to add module 2"
        );

        let total_mods = await moduleInstance.get_numModules();
        assert.strictEqual(total_mods.toNumber(), 2, "Modules not added correctly");
       

       
    });

    it('Test min bids', async() => {
      
        let mod1_min_bid = await moduleInstance.check_minimum_bid(1, {from: accounts[1]});;
        assert.strictEqual(mod1_min_bid.toNumber(), 10, "check min bid not working");
      
    });

    it('Test get ranking', async () => {
        
        const ranking=[1,0]
        const mods= [1,2]
        moduleInstance.check_ranking(mods, accounts[1], {from: accounts[1]}).then(function(res){
            var variable_1 = res[0];
            var variable_2 = res[1];
            assert.equal(variable_1, ranking, "rankings incorrect");
            assert.equal(variable_2, mods, "mods retreived incorrect");
      })
    });



    
});