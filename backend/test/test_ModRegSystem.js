const _deploy_contracts = require("../migrations/2_deploy_contracts_test");
const truffleAssert = require('truffle-assertions');
var assert = require('assert'); 
const { create } = require("domain");
const { debug } = require("console");

var ERC20 = artifacts.require("../contracts/ERC20.sol");
var BiddingPoints = artifacts.require("../contracts/BiddingPoints.sol");
var BiddingMap = artifacts.require("../contracts/BiddingMap.sol");
var Module = artifacts.require("../contracts/Module.sol");
var Students = artifacts.require("../contracts/Students.sol");
var ModRegSystem = artifacts.require("../contracts/ModRegSystem.sol");

contract('ModRegSystem', function(accounts) {
    before(async() => {
        erc20Instance = await ERC20.deployed();
        biddingPointsInstance = await BiddingPoints.deployed();
        biddingMapInstance = await BiddingMap.deployed();
        moduleInstance = await Module.deployed();
        studentInstance = await Students.deployed();
        modRegSystemInstance = await ModRegSystem.deployed();
    });
    console.log("Testing Module Registration System");

    it('Mint Bidding Points', async() => {
        await biddingPointsInstance.getCredit({from: accounts[0], value: 2000000000000000000});
        let checkBP = await biddingPointsInstance.checkCredit(accounts[0]);
        assert.strictEqual(
            checkBP.toString(),
            '20000',
            'Did not mint bidding points successfully'
        );
    });

    it('Create Student 1', async() => {
        let createStudent = await studentInstance.addStudent("test", "test", "test", "test", 1, "CS", "None", {from: accounts[1], value: 1000000000000000000});

        assert.notStrictEqual(
            createStudent,
            undefined,
            "Failed to create student"
        );
    });

    it('Create Student 2', async() => {
        let createStudent = await studentInstance.addStudent("test2", "test2", "test2", "test2", 2, "CS", "None", {from: accounts[2], value: 1000000000000000000});

        assert.notStrictEqual(
            createStudent,
            undefined,
            "Failed to create student"
        );
    });

    it('Allocate Bidding Points', async() => {
        await modRegSystemInstance.allocatePoints({from: accounts[0]});
        let checkBP = await biddingPointsInstance.checkCredit(accounts[1]);
        let checkBP2 = await biddingPointsInstance.checkCredit(accounts[2]);

        assert.strictEqual(
            checkBP.toString(),
            '950',
            'Bidding points were not claimed successfully'
        );

        assert.strictEqual(
            checkBP2.toString(),
            '1000',
            'Bidding points were not claimed successfully'
        );

    });

    it('Check Bonus Points Allocation', async() => {
        await moduleInstance.add(0, 1, {from: accounts[0]});
        await moduleInstance.add(1, 1, {from: accounts[0]});
        await modRegSystemInstance.bid(0, 0, 500, {from: accounts[1]});
        await modRegSystemInstance.bid(1, 0, 300, {from: accounts[2]});
        let checkBP = await biddingPointsInstance.checkCredit(accounts[1]);

        assert.strictEqual(
            checkBP.toString(),
            '690',
            'Bidding points were not claimed successfully'
        );
    });

    it('Check Module Bidding & Rank', async() => {
        await modRegSystemInstance.bid(0, 1, 300, {from: accounts[1]});
        await modRegSystemInstance.bid(1, 1, 500, {from: accounts[2]});
        let checkModuleRank = await modRegSystemInstance.checkModuleRanking(0, {from: accounts[1]});

        assert.strictEqual(
            checkModuleRank.toString(),
            '1',
            'Did not bid for Module successfully'
        );
    });

    it('Check Minimum Bid for Module', async() => {
        let checkMinBid = await modRegSystemInstance.checkMinimumBid(0, {from: accounts[1]});

        assert.strictEqual(
            checkMinBid.toString(),
            '500',
            'Minimum bid not recorded correctly'
        );
    });

    it('Check Allocated Modules', async() => {
        await modRegSystemInstance.allocateModules({from: accounts[0]}); 
        let checkAllocated1 = await modRegSystemInstance.checkAllocatedModules({from: accounts[1]});
        let checkAllocated2 = await modRegSystemInstance.checkAllocatedModules({from: accounts[2]});

        /*assert.strictEqual(
            checkAllocated1.toString(),
            '0',
            'Module was not allocated correctly'
        );*/

        assert.strictEqual(
            checkAllocated2.toString(),
            '1',
            'Module was not allocated correctly'
        );
    });

})