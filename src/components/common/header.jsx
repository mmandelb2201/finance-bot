import React from "react";
import "./common.css";

import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

function Header() {
  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
          <a href="/" className="header-logo">
            {" "}
            <a className="header-logo-finance">Finance</a>
            <a className="header-logo-bot">Bot</a>{" "}
          </a>{" "}
        </section>{" "}
        <section className="header-top__welcome">
          <a>Welcome,User</a>
        </section>{" "}
        <section>
          <Dropdown>
            <Dropdown.Toggle variant="success" className="dropdown">
              Account
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/input-data">Input Financial Data</Dropdown.Item>
              <Dropdown.Item href="/view-account">See Account Details</Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="/sign-up">Login</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </section>{" "}
      </section>{" "}
    </section>
  );
}

export default Header;
