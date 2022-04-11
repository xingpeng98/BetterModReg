import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import Layout from "./components/Layout.js";
import LoginPage from "./LoginPage.js";
import ProfilePage from "./ProfilePage.js";
import ModulesPage from "./ModulesPage.js";

function App() {
  const Web3 = require('web3');
  var web3 = new Web3();
  /* const load = async () => {
    await loadWeb3()
    await loadAccount()
    //await App.loadContract()
    //await App.render()
  };

  load()

  const loadWeb3 = async () => {
    const {ethereum} = window;
    
    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  


  const loadAccount = async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
    console.log(App.account)
  };
  */
  

  // const loadContract = async () => {
  //   // Create a JavaScript version of the smart contract
  //   const mrs = await $.getJSON('ModRegSystem.json')
  //   App.contracts.mrs = TruffleContract(mrs)
  //   App.contracts.mrs.setProvider(App.web3Provider)

  //   // Hydrate the smart contract with values from the blockchain
  //   App.mrs = await App.contracts.mrs.deployed()
  // };

  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = async () => {
    localStorage.removeItem("user");
  };

  return (
    <Layout>
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ marginRight: "20px" }}>
                Profile
              </Nav.Link>
              <Nav.Link href="/modules" style={{ marginRight: "20px" }}>
                Modules
              </Nav.Link>
              {user ? (
                <Nav.Link onClick={logOut} href="/login">
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/modules" element={<ModulesPage />} />
          <Route path="/" element={<ProfilePage />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;