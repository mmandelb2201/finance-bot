import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import InputData from "./components/pages/InputData";
import Settings from "./components/pages/Settings";
import ViewAccount from "./components/pages/ViewAccount";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/input-data" element={<InputData />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/view-account" element={<ViewAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
