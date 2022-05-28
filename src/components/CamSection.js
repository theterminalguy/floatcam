import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import SelectResolution from "./select/Resolution";
import SelectCamera from "./Camera";
import SelectShape from "./select/Shape";

const { electronAPI } = window;

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
    const size = e.target.value;
    let [width, height] = [size, size];
    if (selectedShape === "rectangle") {
      [width, height] = size.split("|");
    }
    electronAPI.sendAsync("set-camera-resolution", { width, height });
  };

  const handleShapeChange = (e) => {
    const video = document.getElementById("video-player");
    const shape = e.target.value;
    setSelectedShape(shape);
    switch (shape) {
      case "circle":
        setResolutionOptions(defaultResolutionOptions);
        video.style.borderRadius = "50%";
        video.style.width = "100px";
        video.style.height = "100px";
        break;
      case "square":
        setResolutionOptions(defaultResolutionOptions);
        video.style.borderRadius = "0";
        video.style.width = "100px";
        video.style.height = "100px";
        break;
      case "rectangle":
        setResolutionOptions(rectangleResolutionOptions);
        video.style.width = "250px";
        video.style.height = "100px";
        video.style.borderRadius = "0";
        break;
      default:
        break;
    }
  };

  const handleMirrorChange = (e) => {
    const video = document.getElementById("video-player");
    const mirror = e.target.checked;
    if (mirror) {
      video.style.transform = "scaleX(-1)";
      video.style["-webkit-transform"] = "-webkit-scaleX(-1)";
    } else {
      video.style.transform = "scaleX(1)";
      video.style["-webkit-transform"] = "scaleX(1)";
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
          <Card.Text as="div">
            <Form.Group controlId="formFlipVideo">
              <label>
                <Form.Label>Flip</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Mirror Recording"
                  onChange={handleMirrorChange}
                />
              </label>
            </Form.Group>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CamSection;
