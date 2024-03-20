import React from "react";
import Navbar from "../Component/navbar";
import NavbarBelow from '../Component/NavbarBelow';
import Alert from "../Component/alert";
import { connect } from "react-redux";
import { useEffect } from "react";
import { verify, getUser, googleLogin } from "../reducer/Actions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { Link } from 'react-router-dom';
import Categories from '../Component/Categories';

const Layout = (props) => {
    let location = useLocation();
    useEffect (() => {
        const values = queryString.parse(location.search);
        const code = values.code;
        if ( code ) {
            props.googleLogin( code );
        } else {
            props.verify();
            props.getUser();
        }
    }, [location]);
    return (
        <div>
          <Navbar />
    <div className="bg-warning">
          <NavbarBelow />
    </div>
    <div className="bg-light pt-5">
          <div className="container m-auto row  p-0">
            <div className="col-lg-3">
              <Categories />
            </div>
          <div className="col-lg content-container">
            {props.message? <Alert message={props.message}/>: null}
            <main style={{ minHeight: '90vh' }} className="main-content2">{props.children}</main>
          </div>

          </div>
    </div>
        
        {/* <Footer /> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.AuthReducer.message,
        access: state.AuthReducer.access,
        refresh: state.AuthReducer.refresh,
        isAuthenticated: state.AuthReducer.isAuthenticated,
        user: state.AuthReducer.user
    }
}

export default connect(mapStateToProps, { verify, getUser, googleLogin })(Layout);