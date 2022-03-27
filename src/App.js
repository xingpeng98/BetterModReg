import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import Layout from "./components/Layout.js";
import LoginPage from "./LoginPage.js";
import ProfilePage from "./ProfilePage.js";

function App() {
  return (
    <Layout>
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link href="/Profile">Profile</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
