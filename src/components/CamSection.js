import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import SelectResolution from "./select/Resolution";
import SelectCamera from "./Camera";
import SelectShape from "./select/Shape";
import SelectFilter from "./select/Filter";

const defaultResolutionOptions = [
  {
    value: "100px",
    label: "100 X 100",
  },
  {
    value: "150px",
    label: "150 X 150",
  },
  {
    value: "200px",
    label: "200 X 200",
  },
  {
    value: "250px",
    label: "250 X 250",
  },
  {
    value: "300px",
    label: "300 X 300",
  },
  {
    value: "350px",
    label: "350 X 350",
  },
  {
    value: "400px",
    label: "400 X 400",
  },
];

const rectangleResolutionOptions = [
  {
    value: "250px|100px",
    label: "250 x 100",
  },
  {
    value: "350px|150px",
    label: "350 x 150",
  },
  {
    value: "450px|200px",
    label: "450 x 200",
  },
  {
    value: "550px|250px",
    label: "550 x 250",
  },
];

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

function CamSection() {
  const [resolutionOptions, setResolutionOptions] = useState(
    defaultResolutionOptions
  );

  const [selectedShape, setSelectedShape] = useState("circle");

  const handleResolutionChange = (e) => {
    const video = document.getElementById("video-player");
    const size = e.target.value;
    if (selectedShape === "rectangle") {
      const [width, height] = size.split("|");
      video.style.width = width;
      video.style.height = height;
      return;
    }
    video.style.width = size;
    video.style.height = size;
  };

  const handleShapeChange = (e) => {
    const video = document.getElementById("video-player");
    const shape = e.target.value;
    setSelectedShape(shape);
    switch (shape) {
      case "circle":
        video.style.borderRadius = "50%";
        setResolutionOptions(defaultResolutionOptions);
        break;
      case "square":
        video.style.borderRadius = "0";
        setResolutionOptions(defaultResolutionOptions);
        break;
      case "rectangle":
        setResolutionOptions(rectangleResolutionOptions);
        video.style.borderRadius = "0";
        break;
      default:
        break;
    }
  };

  return (
    <Container className="p-3">
      <Card>
        <Card.Body>
          <Card.Title>Cam</Card.Title>

          <SelectCamera />
          <SelectResolution
            resolutions={resolutionOptions}
            onChange={handleResolutionChange}
          />
          <SelectShape
            shapes={shapes}
            defaultShape={selectedShape}
            onChange={handleShapeChange}
          />
          <SelectFilter />

          <Card.Text as="div">
            <Form.Group controlId="formFlipVideo">
              <label>
                <Form.Label>Flip</Form.Label>
                <Form.Check type="checkbox" label="Mirror Recording" />
              </label>
            </Form.Group>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CamSection;
/**
 * video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
 */
