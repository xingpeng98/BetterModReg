const ERC20 = artifacts.require("ERC20");
const BiddingPoints = artifacts.require("BiddingPoints");
const BiddingMap = artifacts.require("BiddingMap");
const Module = artifacts.require("Module");
const Students = artifacts.require("Students");

module.exports = (deployer, network, accounts) => {
    deployer.deploy(ERC20);
    deployer.deploy(BiddingPoints);
    deployer.deploy(BiddingMap).then(function() {
        return deployer.deploy(Module, BiddingMap.address);
    });
    deployer.deploy(Students);
}