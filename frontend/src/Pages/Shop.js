import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

const Shop = () => {
  document.title = 'All Products';
  const [data, setData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered index

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
  }, []);

  return (
    <div className="p-3">
      <h1>All Products</h1>
      <hr />
      <Row className="justify-content-around">
          
        {data.map((product, index) => (
          <div
            key={index}
            className="card col-lg-3_5 d-flex mb-4 py-4 px-4 justify-content-center border-0 border-radius-none"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img src={product.image} className="col-lg-12" alt=""/>
            <div className="mt-auto">
              <Rater style={{ fontSize: "20px" }} total={5} interactive={false} rating={2} />
              <Card.Title>{product.name}</Card.Title>
              <span className="text-decoration-line-through me-2 ">$1000</span>
              <span className="fw-bold text-danger">${product.price}</span>
            </div>
            {/* Add to Cart button with conditional rendering based on hoveredIndex */}
              <div className="add-to-cart-button col-lg-10">
            {hoveredIndex === index && (
                <Link  className="col-lg-12 btn" to={`/product/${product.id}/`}><i className="fa fa-shopping-bag me-3"></i>Add to Cart</Link>
            )}
              </div>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Shop;
