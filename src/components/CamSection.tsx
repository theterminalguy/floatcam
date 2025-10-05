import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import SelectResolution from "./select/Resolution";
import SelectCamera from "./Camera";
import SelectShape from "./select/Shape";
import { SelectOption, CameraStyle } from "../types";

const { electronAPI } = window;

const defaultResolutionOptions: SelectOption[] = [
  { value: "100px", label: "100 X 100" },
  { value: "150px", label: "150 X 150" },
  { value: "200px", label: "200 X 200" },
  { value: "250px", label: "250 X 250" },
  { value: "300px", label: "300 X 300" },
  { value: "350px", label: "350 X 350" },
  { value: "400px", label: "400 X 400" },
];

const rectangleResolutionOptions: SelectOption[] = [
  { value: "250px|100px", label: "250 x 100" },
  { value: "350px|150px", label: "350 x 150" },
  { value: "450px|200px", label: "450 x 200" },
  { value: "550px|250px", label: "550 x 250" },
];

const shapes: SelectOption[] = [
  { value: "square", label: "Square" },
  { value: "rectangle", label: "Rectangle" },
  { value: "circle", label: "Circle" },
];

function CamSection(): JSX.Element {
  const [resolutionOptions, setResolutionOptions] = useState<SelectOption[]>(
    defaultResolutionOptions
  );
  const [selectedShape, setSelectedShape] = useState<string>("circle");

  const handleResolutionChange = (e: React.ChangeEvent<any>): void => {
    const size = (e.target as HTMLSelectElement).value;
    let width: string = size;
    let height: string = size;

    if (selectedShape === "rectangle") {
      [width, height] = size.split("|");
    }

    electronAPI.sendSync("shared-window-channel", {
      type: "set-camera-resolution",
      payload: { width, height },
    });
  };

  const handleShapeChange = (e: React.ChangeEvent<any>): void => {
    const shape = (e.target as HTMLSelectElement).value;
    const style: CameraStyle = {};
    setSelectedShape(shape);

    switch (shape) {
      case "circle":
        setResolutionOptions(defaultResolutionOptions);
        style.borderRadius = "50%";
        style.width = "100px";
        style.height = "100px";
        break;
      case "square":
        setResolutionOptions(defaultResolutionOptions);
        style.borderRadius = "0";
        style.width = "100px";
        style.height = "100px";
        break;
      case "rectangle":
        setResolutionOptions(rectangleResolutionOptions);
        style.width = "250px";
        style.height = "100px";
        style.borderRadius = "0";
        break;
      default:
        break;
    }

    electronAPI.sendSync("shared-window-channel", {
      type: "set-camera-shape",
      payload: style,
    });
  };

  const handleMirrorChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const mirror = e.target.checked;
    const style: CameraStyle = {};

    if (mirror) {
      style.transform = "scaleX(-1)";
      style["-webkit-transform"] = "-webkit-scaleX(-1)";
    } else {
      style.transform = "scaleX(1)";
      style["-webkit-transform"] = "scaleX(1)";
    }

    electronAPI.sendSync("shared-window-channel", {
      type: "set-camera-mirror",
      payload: style,
    });
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
