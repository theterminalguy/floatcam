import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function BorderStyle() {
  const borderStyles = [
    {
      value: "solid",
      label: "Solid",
    },
    {
      value: "dashed",
      label: "Dashed",
    },
    {
      value: "dotted",
      label: "Dotted",
    },
    {
      value: "double",
      label: "Double",
    },
    {
      value: "groove",
      label: "Groove",
    },
    {
      value: "ridge",
      label: "Ridge",
    },
    {
      value: "inset",
      label: "Inset",
    },
    {
      value: "outset",
      label: "Outset",
    },
  ];

  const handleChange = (event) => {
    const video = document.getElementById("video-player");
    video.style.borderStyle = event.target.value;
  };

  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoBorderStyle">
        <Form.Label>Style</Form.Label>
        <Form.Control as="select" onChange={handleChange}>
          {borderStyles.map((borderStyle) => (
            <option key={borderStyle.value} value={borderStyle.value}>
              {borderStyle.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default BorderStyle;
