import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function Shape({ shapes, defaultShape, onChange }) {
  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoShape">
        <Form.Label>Shape</Form.Label>
        <Form.Control
          as="select"
          onChange={onChange}
          defaultValue={defaultShape}
        >
          {shapes.map((shape) => (
            <option key={shape.value} value={shape.value}>
              {shape.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default Shape;
