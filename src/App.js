import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/profile" component={ProfilePage} /> */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
