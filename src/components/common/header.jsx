import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
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
        <Navbar.Text>
          {username ? `Welcome, ${username}` : "Sign In"}
        </Navbar.Text>
        <NavDropdown title="Action" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/input-data">
            Input Financial Data
          </NavDropdown.Item>
          <NavDropdown.Item href="/view-account">
            See Account Details
          </NavDropdown.Item>
          <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
