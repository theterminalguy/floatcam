import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function Camera() {
  return (
    <Card.Text as="div">
      <Form.Group controlId="formCameraSource">
        <Form.Label>Camera</Form.Label>
        <Form.Control as="select">
          <option>Front Camera</option>
          <option>Back Camera</option>
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default Camera;
