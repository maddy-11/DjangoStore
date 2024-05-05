import React, { useState } from 'react';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Stripe from '../Component/StripePayment';
import Paypal from '../Component/PayPalPayment';
const Checkout = () => {
  document.title = 'Checkout';
  
  return (
    <div className = "d-flex container">
    <Stripe />
    <Paypal />
    </div>

  );
};

export default Checkout;
