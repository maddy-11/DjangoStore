import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <Image src="your_image_url" rounded fluid />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div>
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
            </p>
            <p>
              Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis.
            </p>
            <p>
              Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante
              venenatis dapibus posuere velit aliquet.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
