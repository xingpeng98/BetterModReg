const _deploy_contracts = require("../migrations/2_deploy_contracts_test");
const truffleAssert = require("truffle-assertions");
var assert = require('assert');

var BiddingMap = artifacts.require("../contracts/BiddingMap.sol");

contract('BiddingMap', (accounts) => {
    before(async () => {
        biddingmapInstance = await BiddingMap.deployed();
    });
    console.log('Testing BiddingMap Contract');

    it('Test bid mod', async () => {
        // Create die
        let bidmod1 = await biddingmapInstance.bidMod(
            accounts[1],
            1,
            100,
            {from:accounts[0]}
        );
        let bidmod2 = await biddingmapInstance.bidMod(
            accounts[1],
            2,
            90,
            {from:accounts[0]}
        );
        let bidmod3 = await biddingmapInstance.bidMod(
            accounts[2],
            1,
            100,
            {from:accounts[0]}
        );
        let studentBid1 = await biddingmapInstance.getStudentBid(accounts[1], 1);
        let studentBid2 = await biddingmapInstance.getStudentBid(accounts[1], 2);
        let studentBid3 = await biddingmapInstance.getStudentBid(accounts[2], 1);
        let studentMods1 = await biddingmapInstance.getStudentMods(accounts[1]);
        let studentMods2 = await biddingmapInstance.getStudentMods(accounts[2]);
        let modStudents1 = await biddingmapInstance.getModStudents(1);
        let modStudents2 = await biddingmapInstance.getModStudents(2);

        // Ensure bidding is successful
        assert.notStrictEqual(
            bidmod1,
            undefined,
            "Failed to bid mod"
        );

        assert.notStrictEqual(
            bidmod2,
            undefined,
            "Failed to bid mod"
        );

        assert.notStrictEqual(
            bidmod3,
            undefined,
            "Failed to bid mod"
        );
        
        // Check student bidding points
        assert.strictEqual(
            studentBid1.toNumber(),
            100,
            "Wrong inplementation"
        );

        assert.strictEqual(
            studentBid2.toNumber(),
            90,
            "Wrong inplementation"
        );

        assert.strictEqual(
            studentBid3.toNumber(),
            100,
            "Wrong inplementation"
        );
        
        // Check student mods
        assert.deepStrictEqual(
            [studentMods1[0].toNumber(), studentMods1[1].toNumber()],
            [1, 2],
            "Wrong inplementation"
        );

        assert.strictEqual(
            studentMods2[0].toNumber(),
            1,
            "Wrong inplementation"
        );

        // Check mod_students
        assert.deepStrictEqual(
            [modStudents1[0], modStudents1[1]],
            [accounts[1], accounts[2]],
            "Wrong inplementation"
        );

        assert.strictEqual(
            modStudents2[0],
            accounts[1],
            "Wrong inplementation"
        );
    });

    it('Test unbid mod', async () => {
        let unbid = await biddingmapInstance.unbidMod(
            accounts[1],
            1,
            {from:accounts[0]}
        );
        let studentBid = await biddingmapInstance.getStudentBid(accounts[1], 1);
        let studentMods = await biddingmapInstance.getStudentMods(accounts[1]);
        let modStudents = await biddingmapInstance.getModStudents(1);

        // Ensure unbidding is successful
        assert.notStrictEqual(
            unbid,
            undefined,
            "Failed to unbid mod"
        );

        // Check student bidding points
        assert.strictEqual(
            studentBid.toNumber(),
            0,
            "Wrong inplementation"
        );
        
        // Check student mods
        assert.deepStrictEqual(
            studentMods.length,
            1,
            "Wrong inplementation"
        );

        assert.deepStrictEqual(
            studentMods[0].toNumber(),
            2,
            "Wrong inplementation"
        );

        // Check mod students
        assert.deepStrictEqual(
            modStudents.length,
            1,
            "Wrong inplementation"
        );

        assert.strictEqual(
            modStudents[0],
            accounts[2],
            "Wrong inplementation"
        );
    });

});