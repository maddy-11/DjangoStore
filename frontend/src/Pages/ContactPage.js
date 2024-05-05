import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" required />
            </Form.Group>

            <Button variant="primary" type="submit" className='mt-2'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
