const BiddingMap = artifacts.require("BiddingMap");

module.exports = (deployer, network, accounts) => {
    return deployer.deploy(BiddingMap);
}