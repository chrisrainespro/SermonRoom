import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>BCOMSermon</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Introduction
            </Link>
            <Link to="/current" className="nav-link">
              Current65 Day
            </Link>
            <Link to="/65day" className="nav-link">
              Makeup
            </Link>
            <Link to="/extensions" className="nav-link">
              Extensions
            </Link>
            <Link to="/counseling" className="nav-link">
              Counseling
            </Link>
            <Link to="/pastor" className="nav-link">
              Pastor Ritchie
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
export default Home;
