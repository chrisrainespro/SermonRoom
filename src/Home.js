import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, Outlet } from "react-router-dom";
import { Container, ListGroupItem } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { VideoContext } from "./VideoContext";


function Home() {

  let { getCategories } = useContext(VideoContext)
  let [catagories, setCatagories] = useState([])
  
  useEffect(() => {
    async function fetch() {
      await getCategories()
      .then((catagories) => setCatagories(catagories))
    }
    fetch()
  },[getCategories]);

  function buildNavBar() {
    if (catagories === null) return
    return catagories.map((catagory) => {
      let url = "list/" + catagory.id;
      return (
        <Link key={catagory.id} to={url} className="nav-link">
        {catagory.title}
      </Link>  
      )
    })
}
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>BCOMSermon</Navbar.Brand>
          <Nav className="me-auto">
            <VideoContext.Consumer>
              {() => {
                return buildNavBar();
              }}
            </VideoContext.Consumer>
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
