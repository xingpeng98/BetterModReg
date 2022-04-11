import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { student, id } = { ...user };
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  //const keys = require("./keys.json");
  //const address = Object.keys(keys.addresses)[id];
  //console.log(keys);
  //console.log(address);
  //console.log(keys.addresses[address]);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessage("Install Metamask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  return (
    <div>
      <h2>Profile</h2>
      {user && user.id != 0 ? (
        <div>
          <h4>Name: {student.student_name}</h4>
          <h4>Username: {student.username}</h4>
          <h4>Seniority: {student.seniority}</h4>
          <h4>Email: {student.email}</h4>
          <h4>Major: {student.major}</h4>
          <h4>Minor: {student.minor}</h4>
          <h2>Wallet</h2>
          <button onClick={connectWalletHandler}>{connButtonText}</button>
          <h4>Address: {defaultAccount}</h4>
          <h4>Balance: {userBalance} </h4>
        </div>
      ) : null}
      {user && user.id == 0 ? (
        <div>
          <h4>You are admin</h4>
        </div>
      ) : null}
      {!user ? <h4>Not logged in yet!</h4> : null}
      {errorMessage}
    </div>
  );
}

export default ProfilePage;
