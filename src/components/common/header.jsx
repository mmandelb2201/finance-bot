<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import "./common.css";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  
  const { name } = useFirebaseAuth();
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    setUsername(name);
  }, [name]);
  
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home">FinanceBot</Navbar.Brand>
        
      </Container>
      <Container className="justify-content-end">
      <Navbar.Text>{username ? `Welcome, ${username}`: "Sign In"}</Navbar.Text>
        <NavDropdown title="Action" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/input-data">Input Financial Data</NavDropdown.Item>
          <NavDropdown.Item href="/view-account">See Account Details</NavDropdown.Item>
          <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
=======
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
              <Dropdown.Item href="/input-data">
                Input Financial Data
              </Dropdown.Item>
              <Dropdown.Item href="/view-account">
                See Account Details
              </Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </section>{" "}
      </section>{" "}
    </section>
>>>>>>> parent of 1436484 (fixing merge conflicts)
  );
}

export default Header;
