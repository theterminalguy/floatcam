import React from "react";
import "./App.css";
//import logo from "./logo.svg";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import Preview from "./components/Preview";
import CamSection from "./components/CamSection";

function SettingsScreen() {
  return (
    <Form>
      <CamSection />
      <Container className="p-3">
        <Card>
          <Card.Body>
            <Card.Title>Border</Card.Title>
            <Card.Text>
              <Form.Group controlId="formVideoBorderWidth">
                <Form.Label>Width</Form.Label>
                <Form.Control as="select">
                  <option>None</option>
                  <option>Thin</option>
                  <option>Medium</option>
                  <option>Thick</option>
                </Form.Control>
              </Form.Group>
            </Card.Text>

            <Card.Text>
              <Form.Group controlId="formVideoBorderStyle">
                <Form.Label>Style</Form.Label>
                <Form.Control as="select">
                  <option>Solid</option>
                  <option>Dashed</option>
                  <option>Dotted</option>
                  <option>Double</option>
                  <option>Groove</option>
                  <option>Ridge</option>
                  <option>Inset</option>
                  <option>Outset</option>
                </Form.Control>
              </Form.Group>
            </Card.Text>

            <Card.Text>
              <Form.Group controlId="formVideoBorderColor">
                <Form.Label>Color</Form.Label>
                <Form.Control type="color" value="#499979" />
              </Form.Group>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Form>
  );
}

function App() {
  return (
    <Container className="p-3">
      <Preview />
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">FloatCam v0.01</h1>
        <sup>
          Developed by <a href="#">@theterminalguy</a>
        </sup>
        <p className="subheader">
          Easily layer your webcam video on top of your screen recorder.{" "}
          <span>
            <a href="https://github.com/theterminalguy">Buy me coffee</a>
          </span>
        </p>

        <SettingsScreen />
      </Container>
    </Container>
  );
}

export default App;
