import React, {useEffect} from "react";
import { connect } from "react-redux";
import { refresh } from "../reducer/Actions";
import axios from 'axios';
import Slider from '../Component/Slider';
const sentences = [
    "Welcome to our website",
    "Discover our latest products",
    "Sign up now for exclusive offers"
  ];

const Home = ({ refresh }) => {
    useEffect(() => {
        const fetchProducts = async () => {
    if (localStorage.getItem('access')) {
      const config = {
            headers: {
                // "Content-Type": "application/json",
            }
        };
        const body = JSON.stringify({ "token": localStorage.getItem('access') });
      try {
        const response = await axios.get('http://localhost:8000/api/checking/', body);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
  };

  fetchProducts();
}, []);
    
    return (
        <>
        <div className="p-5 pb-1  bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Welcome in mywebsite.co.id</h1>
                <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
                <button className="btn btn-primary btn-lg" type="button" onClick={ refresh }>Refresh</button>
            </div>
        </div>
                 <div className="p-1 my-3 bg-warning">
                    <Slider sentences={sentences} />
                </div>
        </>
    )
}

export default connect(null, { refresh })(Home);