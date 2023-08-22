import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "react-router-dom";
import { Container } from "react-bootstrap";
function Home() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Home;
