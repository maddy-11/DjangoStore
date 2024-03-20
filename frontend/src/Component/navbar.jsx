import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHeart, FaShoppingCart, FaUser} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const CustomNavbar = ({ logout, isAuthenticated }) => {
    return (
        <>
      <div className="container">
      <Link to="/account" className="text-dark " style={{ textDecoration: 'none',fontSize:'90%' }}>Account</Link>
      <Link to="/account" className="text-dark mx-3" style={{ textDecoration: 'none',fontSize:'90%' }}>Track Order</Link>
      <Link to="/account" className="text-dark" style={{ textDecoration: 'none',fontSize:'90%' }}>Support</Link>
    </div>
    <hr className="p-0 m-1 m-auto" />
        <Navbar bg="white" expand="lg" variant="white" className="p-">
        <div className="container">
            <Navbar.Brand  to="/">
        <img src="http://localhost:8000/media/images/logo.svg" alt="logo" />
      </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ms-auto">
                    { isAuthenticated ? (
                        <>
                    <Nav.Link as={NavLink} to="/wishlist">
                        <FaHeart />
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/cart">
                        <FaShoppingCart />
                    </Nav.Link>
                        <NavDropdown title={<FaUser />} id="basic-nav-dropdown" className="custom-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/change/password">Change Password</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        </>
                    ) : (
                        <>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </Nav.Item>
                        </>
                    )}
                    
                </Nav>
            </Navbar.Collapse>
            </div>
        </Navbar>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated
    }
}

export default connect(mapStateToProps, { logout })(CustomNavbar);
