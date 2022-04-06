const BiddingPoints = artifacts.require("BiddingPoints");
const BiddingMap = artifacts.require("BiddingMap");
const Module = artifacts.require("Module");
const Students = artifacts.require("Students");
const ModRegSystem = artifacts.require("ModRegSystem");

module.exports = (deployer, network, accounts) => {
    deployer.deploy(ModRegSystem, Students.address, Module.address, BiddingMap.address, BiddingPoints.address);
}