import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  document.title = 'Add Product';
  const [product, setProduct] = useState({
    image: '',
    name: '', 
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if(product.image){
      formData.append('image', product.image);}
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('quantity', product.quantity);

      await axios.post('http://localhost:8000/api/products/', formData);
      toast.success('Product Updated successfully!');
      console.log('Product Updated successfully!');
    } catch (error) {
      toast.error('Error updating product. Please try again.');
      console.error('error', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Montserrat' }} className="card p-3">
    <div className="container">
      <h2 className="p-3">Add Product Page</h2>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input type="file" className="form-control" id="image" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} placeholder="Enter product name" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange} placeholder="Enter product description" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} placeholder="Enter price" />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" className="form-control" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Enter quantity" />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      </div>
    </div>
  );
};

export default AddProduct;
