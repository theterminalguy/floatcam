import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function BorderStyle() {
  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoBorderStyle">
        <Form.Label>Style</Form.Label>
        <Form.Control as="select">
          <option>Solid</option>
          <option>Dashed</option>
          <option>Dotted</option>
          <option>Double</option>
          <option>Groove</option>
          <option>Ridge</option>
          <option>Inset</option>
          <option>Outset</option>
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default BorderStyle;
