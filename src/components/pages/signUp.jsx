import React, { useState } from "react";
import "./pages.css";

function SignUp() {
  return (
    <div className="container">
      <h1 id="title"> Create Account </h1>{" "}
      <input
        name="email"
        type="text"
        className="text-input"
        placeholder="Email"
      />{" "}
      <input
        name="username"
        type="text"
        className="text-input"
        placeholder="Username"
      />{" "}
      <input
        name="password"
        type="text"
        className="text-input"
        placeholder="Password"
      />{" "}
      <input
        name="submit"
        className="submit-button"
        type="button"
        value="Submit"
      />{" "}
      <a href="/login" className="switch-page">
        Login{" "}
      </a>{" "}
    </div>
  );
}

export default SignUp;
