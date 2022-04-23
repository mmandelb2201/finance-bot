import "./App.css";
import React from "react";
import { Header } from "./components/common";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/pages/home";
<<<<<<< HEAD
import SignUp from "./components/pages/Auth/SignUp";
import InputData from "./components/pages/inputData";
import Settings from "./components/pages/settings";
import ViewAccount from "./components/pages/viewAccount";
import { FirebaseAuthProvider } from './contexts';
=======
import SignUp from "./components/pages/signUp";
import SignIn from "./components/pages/login";
import InputData from "./components/pages/inputData";
import Settings from "./components/pages/settings";
import ViewAccount from "./components/pages/viewAccount";
>>>>>>> parent of 1436484 (fixing merge conflicts)

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/sign-up" element={<SignUp />} />{" "}
          <Route path="/login" element={<SignIn />} />{" "}
          <Route path="/input-data" element={<InputData />} />{" "}
          <Route path="/settings" element={<Settings />} />{" "}
          <Route path="/view-account" element={<ViewAccount />} />{" "}
        </Routes>{" "}
      </Router>{" "}
    </div>
  );
}

export default App;
