import React from "react";
import Web3 from "web3";
import App from "./App";
import ModRegSystem from "./ModRegSystem.json";
import BiddingPoints from "./BiddingPoints.json";


function ProfilePage() {


  const user = JSON.parse(localStorage.getItem("user"));
  const { student, id } = { ...user };

  const keys = require("./keys.json");
  const address = Object.keys(keys.addresses)[id];

  
  const web3 = new Web3(window.ethereum);
  const Bidding = new web3.eth.Contract(BiddingPoints.abi,"0xC1631eBba8F96814fA0c16e0B97f8b77F4D5DA2c")
  const ModRegSys = new web3.eth.Contract(ModRegSystem.abi,"0x2AB156F17E3E34cc3a78f5eeE986c5Aa095e48D3");
  const points = Bidding.methods.checkCredit("0x693fAB8C8bb4Cb438e62bC64356869C21b835687").call();
  // const allocatePoints = async() => {
  //   try {
  //     const {ethereum} = window;

  //     if(ethereum) {
  //       // const provider = new ethers.providers.Web3Provider(ethereum);
  //       let points = await ModRegSys.methods.allocatePoints().call();
  //       console.log(points)
  //     }
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }
  
  
  console.log(keys);
  console.log(address);
  console.log(keys.addresses[address]);
  console.log(points)

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <h4>Name: {student.student_name}</h4>
          <h4>Username: {student.username}</h4>
          <h4>Seniority: {student.seniority}</h4>
          <h4>Email: {student.email}</h4>
          <h4>Major: {student.major}</h4>
          <h4>Minor: {student.minor}</h4>
          <h2>Wallet</h2>
          <h4>Address: {address}</h4>
          <h4>Points: {points}</h4>

        </div>
      ) : (
        <p>Not logged in yet!</p>
      )}
    </div>
  );
}

export default ProfilePage;
