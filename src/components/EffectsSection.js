import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import VideoFilter from "./select/Filter";

function EffectsSection() {
  return (
    <Container className="p-3">
      <Card>
        <Card.Body>
          <Card.Title>Effects</Card.Title>
          <VideoFilter />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EffectsSection;
