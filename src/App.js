import React from "react";
//import logo from "./logo.svg";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
//import "./App.css";

function SettingsScreen() {
  return (
    <Form>
      <Container className="p-3">
        <Card>
          <Card.Body>
            <Card.Title>Cam</Card.Title>
            <Card.Text>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Camera</Form.Label>
                <Form.Control as="select">
                  <option>Front Camera</option>
                  <option>Back Camera</option>
                </Form.Control>
              </Form.Group>
            </Card.Text>

            <Card.Text>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Resolution</Form.Label>
                <Form.Control as="select">
                  <option>640x480</option>
                  <option>1280x720</option>
                  <option>1920x1080</option>
                </Form.Control>
              </Form.Group>
            </Card.Text>

            <Card.Text>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Shape</Form.Label>
                <Form.Control as="select">
                  <option>Square</option>
                  <option>Circle</option>
                  <option>Rectangle</option>
                </Form.Control>
              </Form.Group>
            </Card.Text>

            <Card.Text>
              <Form.Group controlId="formBasicEmail">
                <label>
                  <Form.Label>Flip</Form.Label>
                  <Form.Check type="checkbox" label="Mirror Recording" />
                </label>
              </Form.Group>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>

      <Container className="p-3">
        <Card>
          <Card.Body>
            <Card.Title>Border</Card.Title>
            <Card.Text>
              <Form.Group controlId="formBasicEmail">
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
              <Form.Group controlId="formBasicEmail">
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
              <Form.Group controlId="formBasicEmail">
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
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">FloatCam v0.01</h1>
        <p className="subheader">
          A floating camera application you can layer on top of your screen
          recorder with easily customizable settings.{" "}
        </p>

        <p className="subheader">
          Support my work by donating to my Patreon: <a href="https://www.patreon.com/joshuakirkham">Buy me coffee</a>
        </p>
        <SettingsScreen />
      </Container>
    </Container>
  );
}

export default App;
