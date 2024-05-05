import React, {useState} from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const StripePayment = (props) => {
const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  setLoading(true);

  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment-intent/`, {
      amount: 1000,
    });

    const { clientSecret } = data;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log('Payment successful');
    }
  } catch (error) {
    console.error('Error:', error);
  }

  setLoading(false);
};


  return (
    <Container>
  <Row className="justify-content-md-center">
    <Col xs={12} md={6}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cardNumber">
          <Form.Label>Card Number</Form.Label>
          <CardNumberElement options={{ style: { base: { fontSize: '16px' } } }} className="form-control" />
        </Form.Group>
        <Row className="my-3">
          <Col xs={6}>
            <Form.Group controlId="expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <CardExpiryElement options={{ style: { base: { fontSize: '16px' } } }} className="form-control" />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="cvc">
              <Form.Label>CVC</Form.Label>
              <CardCvcElement options={{ style: { base: { fontSize: '16px' } } }} className="form-control" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      </Form>
    </Col>
    <Col xs={12} md={6}>
      
    </Col>
  </Row>
</Container>
  )
}

export default StripePayment;