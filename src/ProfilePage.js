import React, { useState, useEffect } from "react";
import {ethers} from 'ethers';
import Web3 from "web3";
import Students from './Students.json';

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { student, id } = { ...user };
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [studentNumber, getStudentNumber] = useState(null);

  const web3 = new Web3("http://127.0.0.1:7545");
  const Student = new web3.eth.Contract(Students.abi, "0x4F04c5a328F14eaf41893a30e1230B3ed18Ddc5C"); 

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(result => {
        accountChangedHandler(result[0]);
        addStudent(result[0]); 
      }).then()
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

  const addStudent = async(address) => {
    window.ethereum
      .request({method: 'eth_sendTransaction', params: [address]})
      .then(() => {
        Student.methods.addStudent(student.student_name, student.username, student.password, student.email, 4, student.major, student.minor).send({from: address, value: 1000000000000000000});
      })
    Student.methods.addStudent(student.student_name, student.username, student.password, student.email, 4, student.major, student.minor).call({from: address, value: 1000000000000000000});
    const num = await Student.methods.get_numStudents().call({from: address});
    getStudentNumber(num);
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
          <button onClick={connectWalletHandler}>Connect Wallet</button>
          <h4>Address: {defaultAccount}</h4>
          <h4>Balance: {userBalance} </h4>
          <h4>Increment Number: {studentNumber} </h4>
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
