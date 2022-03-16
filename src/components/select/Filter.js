import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function Filter() {
  const filters = [
    {
      value: "none",
      label: "None",
    },
    {
      value: "blur",
      label: "Blur",
    },
    {
      value: "grayscale",
      label: "Grayscale",
    },
    {
      value: "sepia",
      label: "Sepia",
    },
    {
      value: "invert",
      label: "Invert",
    },
    {
      value: "sketch",
      label: "Sketch",
    },
    {
      value: "emboss",
      label: "Emboss",
    },
    {
      value: "posterize",
      label: "Posterize",
    },
    {
      value: "toon",
      label: "Toon",
    },
    {
      value: "pixelate",
      label: "Pixelate",
    },
    {
      value: "vignette",
      label: "Vignette",
    },
  ];
  return (
    <Card.Text>
      <Form.Group controlId="formVideoFilter">
        <Form.Label>Filter</Form.Label>
        <Form.Control as="select">
          {filters.map((filter) => (
            <option key={filter.value}>{filter.label}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default Filter;
