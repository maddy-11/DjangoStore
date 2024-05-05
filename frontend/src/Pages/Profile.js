import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProfilePage = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> John Doe
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> johndoe@example.com
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> New York City
              </Card.Text>
              <Button variant="primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
