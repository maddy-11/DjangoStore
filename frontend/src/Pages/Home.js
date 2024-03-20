import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

const Home = () => {
  document.title = 'All Products';
  const [data, setData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProducts();
    const handleScroll = () => {
      cardRefs.current.forEach((cardRef, index) => {
        const top = cardRef.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight * 0.75) {
          cardRef.classList.add('fade-in');
        } else {
          cardRef.classList.remove('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home">
    <div className="col-lg">
      <Row className="text-center">
            <img className="col-lg-6" src="http://localhost:8000/media/images/banner-1.1.png" alt=""/>
            <img className="col-lg-6" src="http://localhost:8000/media/images/banner-2.2.png" alt=""/>
      </Row>
    </div>
    <div className="mt-5 container col-lg-11">
      <h2 className="fw-bold">Categories</h2>
       <div className="row text-center">
        <div className="column-1-5">
            <div className="bg-silver p-4 rounded-circle d-flex justify-content-center align-items-center m-auto">
                <img className="w-100" src={`http://localhost:8000/media/images/armchair.png`} alt="" />
            </div>
          <label>Sofa</label>
        </div>
        <div className="column-1-5">
            <div className="bg-silver p-4 rounded-circle d-flex justify-content-center align-items-center m-auto">
                <img className="w-100" src={`http://localhost:8000/media/images/armchair.png`} alt=""/>
            </div>
          <label>Sofa</label>
        </div>        
        <div className="column-1-5">
            <div className="bg-silver p-4 rounded-circle d-flex justify-content-center align-items-center m-auto">
                <img className="w-100" src={`http://localhost:8000/media/images/armchair.png`} alt=""/>
            </div>
          <label>Sofa</label>
        </div>
        <div className="column-1-5">
            <div className="bg-silver p-4 rounded-circle d-flex justify-content-center align-items-center m-auto">
                <img className="w-100" src={`http://localhost:8000/media/images/armchair.png`} />
            </div>
          <label>Sofa</label>
        </div>
        <div className="column-1-5">
            <div className="bg-silver p-4 rounded-circle d-flex justify-content-center align-items-center m-auto">
                <img className="w-100" src={`http://localhost:8000/media/images/armchair.png`} alt=""/>
            </div>
          <label>Sofa</label>
        </div>
        <div className="column-1-5">
            <div className="bg-silver p-4 rounded-circle d-flex justify-content-center align-items-center m-auto">
                <img className="w-100" src={`http://localhost:8000/media/images/armchair.png`} alt=""/>
            </div>
          <label>Sofa</label>
        </div>
        <div className="column-1-5">
            <div className="bg-silver p-4 rounded-circle d-flex justify-content-center align-items-center m-auto">
                <img className="w-100" src={`http://localhost:8000/media/images/armchair.png`} alt=""/>
            </div>
          <label>Sofa</label>
        </div>
        <div className="column-1-5">
            <div className="bg-silver p-4 rounded-circle d-flex justify-content-center align-items-center m-auto">
                <img className="w-100" src={`http://localhost:8000/media/images/armchair.png`} alt=""/>
            </div>
          <label>Sofa</label>
        </div>
        
    </div>

      <h2 className="fw-bold mt-5">Featured</h2>
      <Row className="justify-content-around scroll">
      {data.map((product, index) => (
        <div
          key={index}
          className="card shadow-sm col-lg-3_5 d-flex mb-4 py-4 px-4 justify-content-center border-0 border-radius-none"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          ref={(element) => {
            if (element) {
              cardRefs.current[index] = element;
            }
          }}
        >
          <img src={product.image} className="col-lg-12 col-12" alt="" />
          <div className="mt-auto">
            <Rater style={{ fontSize: "20px" }} total={5} interactive={false} rating={2} />
            <Card.Title>{product.name}</Card.Title>
            <span className="text-decoration-line-through me-2 ">$1000</span>
            <span className="fw-bold text-danger">${product.price}</span>
          </div>
          <i className="fa-solid fa-bag-shopping"></i>
          <div className="add-to-cart-button col-lg-11">
            {hoveredIndex === index && (
              <Link className="col-lg-12 btn text-white" to={`/product/${product.id}/`}>
                <i className="fa fa-shopping-cart me-3"></i>Add to Cart
              </Link>
            )}
          </div>
        </div>
      ))}
    </Row>

    </div>
    </div>
  );
};

export default Home;
