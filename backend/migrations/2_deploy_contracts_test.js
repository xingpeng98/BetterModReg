

const BiddingMap = artifacts.require("BiddingMap");
const Module = artifacts.require("Module");

module.exports = (deployer, network, accounts) => {
    deployer.deploy(BiddingMap).then(function() {
      return deployer.deploy(Module,BiddingMap.address );
    });
  };