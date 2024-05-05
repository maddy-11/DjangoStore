import React from "react";
import Navbar from "../Component/navbar";
import NavbarBelow from '../Component/NavbarBelow';
import Alert from "../Component/alert";
import { connect } from "react-redux";
import { useEffect } from "react";
import { verify, getUser, googleLogin } from "../reducer/Actions";
import queryString from "query-string";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Categories from '../Component/Categories';

const Layout = (props) => {
    var isAuthenticated = props.isAuthenticated;
    let location = useLocation();
    const navigate = useNavigate();
    useEffect (() => {
        if(!isAuthenticated){
            // navigate('/login')
        }
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
            {props.message? <Alert message={props.message}/>: null}
    <div className="pt-5">
          <div className=" m-auto row  p-0">
          <div className="col-lg-12 content-container p-0">
            <main style={{ minHeight: '90vh' }} className="main-content2 p-0 m-0">{props.children}</main>
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