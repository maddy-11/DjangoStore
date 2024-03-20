import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import TablePage from '../Component/TablePage';
import QuantityInput from '../Component/QuantityInput';
import { FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

const Cart = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      document.title = 'Show Products';
      const fetchProducts = async () => {
        if (localStorage.getItem('access')) {
          const config = {
            headers: {
              "Content-Type": "application/json",
            }
          };
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/`, config);
            setData(response.data);
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        }
      };
      fetchProducts();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (data.length > 0) {
      const trElements = document.querySelectorAll('.MuiTableHead-root .MuiTableRow-root');
      trElements.forEach(trElement => {
        if (trElement.classList.contains('css-apge8j-MuiTableRow-root')) {
          trElement.classList.add('bg-warning');
        }
      });
    }
  }, [data]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this order!',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/orders/${id}/`);
        console.log('Product Deleted');
        setData((prevData) => prevData.filter((item) => item.id !== id));
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleQuantityChange = (id, change, updatedQuantity) => {
    setData(prevData => {
      const updatedData = prevData.map(item => {
        if (item.id === id) {
          let newQuantity;
          if (change === 'plus') {
            newQuantity = updatedQuantity + 1;
          } else {
            newQuantity = updatedQuantity - 1;
          }
          const quantity = Math.max(newQuantity, 1);

          axios.post(`${process.env.REACT_APP_API_URL}/api/orders/${id}/`, { quantity })
            .then(response => {
              console.log('Quantity updated successfully:', response.data);
            })
            .catch(error => {
              console.error('Error updating quantity:', error);
            });
          return { ...item, quantity };
        }
        return item;
      });
      return updatedData;
    });
  };

  const columns = useMemo(
    () => [
      {
        header: 'Product',
        size: 150,
        Cell: ({ row }) => (
          <>
            <img
              alt="product"
              height={30}
              src={`${process.env.REACT_APP_API_URL}/${row.original.pid.image}`}
              loading="lazy"
              style={{ borderRadius: '10%' }}
            />
            <span className="ms-2">{row.original.pid.name}</span>
          </>
        ),
      },
      {
        accessorKey: 'pid.price',
        header: 'Price',
        size: 150,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 150,
        Cell: ({ row }) => (
          <div className="col-lg-7">
            <QuantityInput
              value={row.original.quantity}
              onIncrease={() => handleQuantityChange(row.original.id, 'plus', row.original.quantity)}
              onDecrease={() => handleQuantityChange(row.original.id, 'minus', row.original.quantity)}
            />
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Total',
        Cell: ({ row }) => (
          <span>{row.original.pid.price * row.original.quantity}</span>
        ),
        size: 150,
      },
      {
        header: 'Delete',
        size: 100,
        Cell: ({ row }) => (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(row.original.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      },
    ],
    []
  );

  const columnOrder = useMemo(() => ['id', 'Image', 'name', 'Quantity', 'Price'], []);

  return (
    <div className="">
      <h1 className="bg-light m-auto p-3 text-center">Shopping Cart <FaShoppingCart className='ms-3 text-danger'/></h1>
      <div className="row justify-content-center p-5">
        <div className="card col-lg-9 me-3">
          <TablePage columns={columns} data={data} columnOrder={columnOrder} />
        </div>
        <div className="col-lg">
          <div className="card p-3">
            <h5 className="fw-bold text-center">Have a Coupon?</h5>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Enter Coupon Here" />
              <button className="btn btn-primary">Apply</button>
            </div>
          </div>
          <div className="card p-4 mt-2">
            <div className="d-flex justify-content-between"> 
              <p>Total Amount</p>
              <p>$100</p>
            </div>
            <div className="d-flex justify-content-between"> 
              <p>Total Discount</p>
              <p>20%</p>
            </div>
            <div className="d-flex justify-content-between"> 
              <p>Final Price</p>
              <p>$80</p>
            </div>
          </div>
          <Link to='/checkout' className="btn btn-warning form-control mt-3">Check Out </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(Cart);
