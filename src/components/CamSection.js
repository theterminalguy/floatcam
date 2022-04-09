import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import SelectResolution from "./select/Resolution";
import SelectCamera from "./Camera";
import SelectShape from "./select/Shape";
import SelectFilter from "./select/Filter";

function CamSection() {
  return (
    <Container className="p-3">
      <Card>
        <Card.Body>
          <Card.Title>Cam</Card.Title>

          <SelectCamera />
          <SelectResolution />
          <SelectShape />
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
