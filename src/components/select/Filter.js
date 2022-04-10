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
      value: "blur(3px)",
      label: "Blurry",
    },
    {
      value: "brightness(1.3)",
      label: "Bright",
    },
    {
      value: "brightness(2.3)",
      label: "Brighter",
    },
    {
      value: "contrast(150%)",
      label: "Pop",
    },
    {
      value: "grayscale(100%)",
      label: "No Color",
    },
    {
      value: "hue-rotate(180deg)",
      label: "Mystique",
    },
    {
      value: "invert(100%)",
      label: "Ghost",
    },
    {
      value: "opacity(50%)",
      label: "Transparent",
    },
    {
      value: "saturate(7)",
      label: "Mars",
    },
    {
      value: "sepia(100%)",
      label: "Mexico",
    },
    {
      value: "drop-shadow(8px 8px 10px %s)",
      label: "Shadow",
    },
  ];

  const handleChange = (e) => {
    const video = document.getElementById("video-player");
    let filter = e.target.value;
    if (filter === "drop-shadow(8px 8px 10px %s)") {
      const videoBorderColor =
        document.getElementById("video-border-color").value;
      filter = `drop-shadow(8px 8px 10px ${videoBorderColor})`;
    }
    video.style.filter = filter;
    video.style["-webkit-filter"] = `-webkit-${filter}`;
  };
  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoFilter">
        <Form.Label>Filter</Form.Label>
        <Form.Control as="select" onChange={handleChange}>
          {filters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default Filter;
