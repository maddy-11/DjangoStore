import React from 'react';
import { Button, Form } from 'react-bootstrap';

const QuantityInput = ({ value, onIncrease, onDecrease }) => {
  const handleIncrease = () => {
    onIncrease();
  };

  const handleDecrease = () => {
    onDecrease();
  };

  return (
    <Form.Group>
      <div className="input-group">
        <Button variant="outline-secondary" onClick={handleDecrease}>-</Button>
        <Form.Control
          type="number"
          value={value}
          readOnly
          className="text-center p-0 m-0"
        />
        <Button variant="outline-secondary" onClick={handleIncrease}>+</Button>
      </div>
    </Form.Group>
  );
};

export default QuantityInput;
