import React, { useState } from "react";
import "./bot.css";

function SignIn() {
  // create hooks to change form inputs
  const [error, setError] = useState("");

  // create hooks to monitor input changes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateFields = (email, password) => {
    if (email !== "" && password !== "") {
      return "";
    } else {
      return "Please fill in all fields";
    }
  };

  return (
    <div className="container">
      <h1 id="title"> Login </h1>{" "}
      <input
        name="email"
        type="text"
        className="text-input"
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
      />{" "}
      <input
        name="password"
        type="text"
        className="text-input"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />{" "}
      <input
        name="submit"
        className="submit-button"
        type="button"
        value="Submit"
      />{" "}
      <h3 id="error-label"> {error} </h3>{" "}
      <a href="/sign-up" className="switch-page">
        Sign Up{" "}
      </a>{" "}
    </div>
  );
}

export default SignIn;
