import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import Layout from "./components/Layout.js";
import LoginPage from "./LoginPage.js";
import ProfilePage from "./ProfilePage.js";
import ModulesPage from "./ModulesPage.js";

function App() {
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
