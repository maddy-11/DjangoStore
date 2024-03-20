import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Categories = ({ isSidebarOpen }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subMenuStates, setSubMenuStates] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/');
        setCategories(response.data);
        // Initialize subCategories state with nested arrays
        setSubCategories(new Array(response.data.length).fill([]));
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleSubMenu = async (id) => {
    const response = await axios.get(`http://localhost:8000/api/get-sub-categories/${id}/`);
    const newSubCategories = [...subCategories];
    newSubCategories[id] = response.data;
    setSubCategories(newSubCategories);

    const newSubMenuStates = new Array(categories.length).fill(false);
    newSubMenuStates[id] = !subMenuStates[id];
    setSubMenuStates(newSubMenuStates);
  };

  return (
    <div className ="card pt-3 p-2" style={{border:'none'}}>
    <h5 className="fw-bold mb-5 text-center">Product Categories</h5>
    <div>
      {categories.map((item, index) => (
        <div key={index} className="mb-3">
          <div className="item d-flex justify-content-left align-items-center container">
            <label className="ms-3" htmlFor={`mobileLaptop${index}`}>{item.category}</label>
            <span className="plus-icon text-warning ms-auto" style={{ fontSize: '150%' }} onClick={() => toggleSubMenu(item.id)}>+</span>
          </div>
          {subMenuStates[item.id] && (
            <>
              <hr className="text-primary w-75 m-auto p-0 m-0" />
              <div className="p-2">
                {subCategories[item.id].map((subItem, subIndex) => (
                  <div key={subIndex}>
                    <NavLink className="link" to={`/products/${subItem.sub_category}`}>{subItem.sub_category}</NavLink>
                  </div>
                ))}
              </div>
              <hr className="" />
            </>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}

export default Categories;
