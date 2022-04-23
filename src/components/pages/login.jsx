import React, { useState } from "react";
import "./pages.css";

const SignIn = () => {
  return (
    <div className="login-container">
      <h1 id="title">Login</h1>
      <input
        name="email"
        type="text"
        className="text-input"
        placeholder="Email"
        // onChange={(event) => setEmail(event.target.value)}
      />
      <input
        name="password"
        type="text"
        className="text-input"
        placeholder="Password"
        // onChange={(event) => setPassword(event.target.value)}
      />
      <input
        name="submit"
        className="submit-button"
        type="button"
        value="Submit"
        //onClick={() => signInUser()}
      />

      <a href="/sign-up" className="switch-page">
        Sign Up
      </a>
    </div>
  );
};

export default SignIn;
