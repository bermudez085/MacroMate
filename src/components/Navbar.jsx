import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useSearch } from "./SearchContext";
import "bootstrap/dist/css/bootstrap.min.css";

function MyNavbar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(false);

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    if (location.pathname !== "/compare") {
      setSearchTerm("");
    }
  }, [location.pathname]);

  return (
    <Navbar 
      bg="success" 
      variant="dark" 
      expand="md" 
      fixed="top"
      expanded={expanded} 
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="MacroMate Logo"
              width="50"
              height="50"
              className="d-inline-block align-top me-2"
            />
            MacroMate
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/compare" onClick={() => setExpanded(false)}>Dietary Needs</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>Contact Us</Nav.Link>
          </Nav>

          {/* Search bar only on /compare */}
          {location.pathname === "/compare" && (
            <Form className="d-flex flex-grow-1 justify-content-center">
              <input
                type="text"
                value={searchTerm}
                onChange={onChange}
                placeholder="Search restaurants..."
                className="navbar-search-input"
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
