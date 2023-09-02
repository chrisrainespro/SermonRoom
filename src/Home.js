import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, Outlet } from "react-router-dom";
import { Container, ListGroupItem } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "./Contexts/CategoryContext";


function Home() {

  let { getCategories, categories, setCategories } = useContext(CategoryContext)
  
  useEffect(() => {
    async function fetch() {
      await getCategories()
      .then((categories) => setCategories(categories))
    }
    fetch()
  },[]);

  function buildNavBar() {
    
    if (categories === null) return
    return categories.map((category) => {
     if (category.containsSeries) {
       let url = "series/list/"+category.id;
        return (
          <Link key={category.id} to={url} className="nav-link">
          {category.title}
        </Link>
        )  
     }
     else {
      let url = "videos/list/" + category.id;
      return (
        <Link key={category.id} to={url} className="nav-link">
        {category.title}
      </Link>  
      )
     }
      
    })
}
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>BCOMSermon</Navbar.Brand>
          <Nav className="me-auto">
            <CategoryContext.Consumer>
              {() => {
                return buildNavBar();
              }}
            </CategoryContext.Consumer>
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
