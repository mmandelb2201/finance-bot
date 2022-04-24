import React, { useState } from "react";
import "./common.css";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useFirebaseAuth } from "./../../hooks";

function Header() {

  const { name } = useFirebaseAuth();
  console.log(name);
  return (
    <Navbar bg="success" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">FinanceBot</Navbar.Brand>
      </Container>
      <Container className="justify-content-end">
        <Navbar.Text>{name ? `Welcome, ${name}` : "Sign In"}</Navbar.Text>
        <NavDropdown title="Action" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/input-data">
            Input Financial Data
          </NavDropdown.Item>
          <NavDropdown.Item href="/view-account">
            See Account Details
          </NavDropdown.Item>
          <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
          <NavDropdown.Item href="/sign-up">Sign Up</NavDropdown.Item>
          <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default Header;
