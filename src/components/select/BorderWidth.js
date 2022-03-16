import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function BorderWidth() {
  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoBorderWidth">
        <Form.Label>Width</Form.Label>
        <Form.Control as="select">
          <option>None</option>
          <option>Thin</option>
          <option>Medium</option>
          <option>Thick</option>
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default BorderWidth;
