import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import SelectBorderWidth from "./select/BorderWidth";
import SelectBorderStyle from "./select/BorderStyle";

const { electronAPI } = window;

function BorderSection() {
  const handleColorChange = (event) => {
    electronAPI.sendSync("shared-window-channel", {
      type: "set-border-color",
      payload: event.target.value,
    });
  };

  return (
    <Container className="p-3">
      <Card>
        <Card.Body>
          <Card.Title>Border</Card.Title>
          <SelectBorderWidth />
          <SelectBorderStyle />

          <Card.Text as="div">
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="color"
                id="video-border-color"
                defaultValue="#499979"
                onChange={handleColorChange}
              />
            </Form.Group>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BorderSection;
