import { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
// import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { InputGroup,Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Tab, Tabs, TabContent } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { Carousel } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: null,
  });
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  fetchProducts();
}, [id]);
  document.title = product.name;
  const [quantity, setQuantity] = useState(1);
//   const images = [
//   {
//     original:
//       "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
//     thumbnail:
//       "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     original:
//       "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
//     thumbnail:
//       "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     original:
//       "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
//     thumbnail:
//       "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     original:
//       "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     thumbnail:
//       "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     original:
//       "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
//     thumbnail:
//       "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
// ];
  const productDetailItem = {
    reviews: "150",
    brand: "apex",
    category: "Sofa",
    previousPrice: 599,
   size: ["XS", "S", "M", "L", "XL"],
   color: ["black", "blue", "red"],
  };
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleQuantityChange = (amount) => {
    setQuantity(Math.max(1, quantity + amount));
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);

    const formData = new FormData();
    if (product.image) {
      formData.append('pid', id);
    }
    formData.append('size', selectedSize);
    formData.append('description', product.description);
    formData.append('color', selectedColor);
    formData.append('quantity', quantity);
    formData.append('token', localStorage.getItem('access'));

    try {
        const response = await axios.post('http://localhost:8000/api/orders/', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      console.log('Data stored in the database', response);
    } catch (error) {
      console.error('Error storing data in the database:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Container fluid className="mx-auto max-w-1200px border-b py-3 p-0 m-0">
      <Row className="container m-auto ">
        <Col md={6} className="card d-flex align-items-center justify-content-center">
    {/*  <Carousel> */}
    {/*   {images.map((image, index) => ( */}
    {/*     <Carousel.Item key={index}> */}
    {/*       <img */}
    {/*         className="d-block w-100" */}
    {/*         src={image.original} */}
    {/*         alt={`Slide ${index}`} */}
    {/*         style={{height:'400px'}} */}
    {/*       /> */}
    {/*     </Carousel.Item> */}
    {/*   ))} */}
    {/* </Carousel> */}
        {/* Image Gallery */}
          {/* <ReactImageGallery */}
          {/*   showBullets={true} */}
          {/*   showFullscreenButton={false} */}
          {/*   showPlayButton={false} */}
          {/*   items={productDetailItem.images} */}
          {/* /> */}

              <img
            className="d-block w-100"
            src={product.image}
            alt={`image1`}
          />
        </Col>

        {/* Description */}
        <Col md={6}>
          <Card className="p-4">
            <h2 className="pt-3 text-2xl font-bold">{product.name}</h2>
            <div className="mt-1">
              <div className="d-flex">
                <Rater style={{ fontSize: "20px" }} total={5} interactive={false} rating={4} />
                <p className="ms-2">({productDetailItem.reviews})</p>
              </div>
            </div>

            <p className="mt-2 fw-bold small m-0 p-0">
              Availability:{" "}
              {product.quantity > 0 ? (
                <span className="text-success">In Stock</span>
              ) : (
                <span className="text-danger">Expired</span>
              )}
            </p>

            <p className="fw-bold small m-0 p-0">Brand: {productDetailItem.brand}</p>
            <p className="fw-bold small">Category: {productDetailItem.category}</p>

            <p className="">
                <span className="fw-bold">
                  ${product.price}
                </span>{" "}
                <span className="text-sm small text-sm-md fw-normal text-danger" style={{ textDecoration: 'line-through' }}>
                  ${productDetailItem.previousPrice}
                </span>
              </p>

            <p className="">{productDetailItem.description}</p>

            {/* Size */}
            <Form.Group controlId="formSize" className="my-2">
              <Form.Label className="">Size</Form.Label>
              <div className="">
                {productDetailItem.size.map((size, index) => (
                  <Button
                    key={index}
                    variant={selectedSize === size ? "primary" : "outline-secondary"}
                    className="m-1 btn-sm"
                    onClick={() => handleSizeSelection(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </Form.Group>

            {/* Color */}
                <Row className="">
                  {/* Color */}
                  <Col md={6}>
                    <Form.Group controlId="formColor">
                      <Form.Label className="">Color</Form.Label>
                      <div className="d-flex flex-wrap">
                        {productDetailItem.color.map((color, index) => (
                          <Button
                            key={index}
                            variant={selectedColor === color ? "primary" : "outline-secondary"}
                            className={`m-1 color-button rounded-circle ${selectedColor === color ? "selected" : ""}`}
                            style={{
                              backgroundColor: color,
                              width: '1rem', height: '1.6rem',
                              filter: selectedColor === color ? "brightness(50%)" : "brightness(100%)",
                              border: selectedColor === color ? "3px solid darkgrey" : "2px solid transparent",
                            }}
                            onClick={() => handleColorSelection(color)}
                          />
                        ))}
                      </div>
                    </Form.Group>
                  </Col>

                  {/* Quantity */}
                  <Col md={6}>
                    <Form.Group controlId="formQuantity">
                    <Form.Label className="pb-2 text-xs text-gray-500">Quantity</Form.Label>
                    <InputGroup size="sm">
                    <Button variant="outline-secondary" size="sm" style={{ width: '3rem' }} onClick={() => handleQuantityChange(-1)}>-</Button>
                    <input type="number" value={quantity} className="text-center" onChange={(e) => setQuantity(e.target.value)} min="1" size="sm" style={{ width: '3rem' }} />
                    <Button variant="outline-secondary" size="sm" style={{ width: '3rem' }} onClick={() => handleQuantityChange(1)}>+</Button>
                    </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

            {/* Add to Cart and Wishlist buttons */}
            <div className="mt-5 d-flex flex-row gap-3">
            <Button
            className="btn text-center"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            >
            <BiShoppingBag className="" />
            Add to Cart
            </Button>
            <Button
                className="btn btn-warning text-center"
              >
                <AiOutlineHeart className="" />
                Wishlist
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="bg-light mt-5">
      <div className="container col-lg-10">
        <Tabs defaultActiveKey="tab1" id="tabs">
          <Tab eventKey="tab1" title="Description" className="">
            <TabContent>
              <h4>Introduction</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the on leap into electronic typesetting, remaining essentially unchanged. It wasn’t popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, andei more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum to make a type specimen book.
              </p>
              <h4>Features</h4>
              <ul>
                <li>slim body with metal cover</li>
                <li>latest Intel Core i5-1135G7 processor (4 cores / 8 threads)</li>
                <li>8GB DDR4 RAM and fast 512GB PCIe SSD</li>
                <li>NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit keyboard, touchpad with gesture support</li>
              </ul>
            </TabContent>
          </Tab>
          <Tab eventKey="tab2" title="Reviews">
            <TabContent>
              <h4>Introduction</h4>
              <p>
                tab 2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the on leap into electronic typesetting, remaining essentially unchanged. It wasn’t popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, andei more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum to make a type specimen book.
              </p>
              <h4>Features</h4>
              <ul>
                <li>slim body with metal cover</li>
                <li>latest Intel Core i5-1135G7 processor (4 cores / 8 threads)</li>
                <li>8GB DDR4 RAM and fast 512GB PCIe SSD</li>
                <li>NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit keyboard, touchpad with gesture support</li>
              </ul>
            </TabContent>
          </Tab>
          <Tab eventKey="tab3" title="Seller Info">
            <TabContent>
              <h4>Introduction</h4>
              <p>
                tab 3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the on leap into electronic typesetting, remaining essentially unchanged. It wasn’t popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, andei more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum to make a type specimen book.
              </p>
              <h4>Features</h4>
              <ul>
                <li>slim body with metal cover</li>
                <li>latest Intel Core i5-1135G7 processor (4 cores / 8 threads)</li>
                <li>8GB DDR4 RAM and fast 512GB PCIe SSD</li>
                <li>NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit keyboard, touchpad with gesture support</li>
              </ul>
            </TabContent>
          </Tab>
        </Tabs>
      </div>
    </div>
    </Container>
  );
};

export default ProductDetail;