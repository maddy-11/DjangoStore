import React from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <div className="container m-auto d-flex">
    <Nav className=" p-2">
      <Nav.Link as={Link} to="/" className="nav-link custom-style">Home</Nav.Link>
      <Nav.Link as={Link} to="/shop" className="nav-link custom-style">Shop</Nav.Link>
      <Dropdown as={Nav.Item}>
        <Dropdown.Toggle as={Nav.Link} variant="link" className="nav-link custom-style">Shop</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/shop/shop-1">Shop 1</Dropdown.Item>
          <Dropdown.Item as={Link} to="/shop/shop-2">Shop 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={Nav.Item}>
        <Dropdown.Toggle as={Nav.Link} variant="link" className="nav-link custom-style">Categories</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/categories/category-1">Category 1</Dropdown.Item>
          <Dropdown.Item as={Link} to="/categories/category-2">Category 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Nav.Link as={Link} to="/about" className="nav-link custom-style">About</Nav.Link>
      <Nav.Link as={Link} to="/about" className="nav-link custom-style">Contact</Nav.Link>
    </Nav>
    <div className="p-2 ms-auto">
    <Link className="d-flex btn btn-dark align-items-center">Become a Seller</Link> 
    </div>
     </div>
  );
}

export default MyNavbar;
