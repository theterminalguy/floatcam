import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function Shape() {
  const shapes = [
    {
      value: "circle",
      label: "Circle",
    },
    {
      value: "square",
      label: "Square",
    },
    {
      value: "rectangle",
      label: "Rectangle",
    },
  ];

  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoShape">
        <Form.Label>Shape</Form.Label>
        <Form.Control as="select">
          {shapes.map((shape) => (
            <option key={shape.value}>{shape.label}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default Shape;
