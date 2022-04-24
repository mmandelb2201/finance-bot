import React from "react";
import "./common.css";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from 'react-bootstrap/Offcanvas'
import Nav from 'react-bootstrap/Nav'

function Header() {
  return (
    <Navbar bg="success" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">FinanceBot</Navbar.Brand>
      </Container>
      <Container className="justify-content-end">
        <Navbar.Text>Welcome, {"User"}</Navbar.Text>
        <NavDropdown title="Action" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/input-data">
            Input Financial Data
          </NavDropdown.Item>
          <NavDropdown.Item href="/view-account">
            See Account Details
          </NavDropdown.Item>
          <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
        </NavDropdown>

        <Navbar.Offcanvas 
          id="offcanvasnavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/input-data">Input Financial Data</Nav.Link>
              <Nav.Link href="/view-account">See Account Details</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
          </Offcanvas.Body>

        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
