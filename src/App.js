import React from "react";
import "./App.css";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import CamSection from "./components/CamSection";
import BorderSection from "./components/BorderSection";
import EffectsSection from "./components/EffectsSection";

function SettingsScreen() {
  return (
    <Form>
      <CamSection />
      <BorderSection />
      <EffectsSection />
    </Form>
  );
}

function App() {
  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">
          <span style={{fontStyle: "italic", fontSize: "54px"}}>f</span>loatcam{" "}
          <span role="img" arial-label="camera-with-flash">
            📸
          </span>
        </h1>
        <SettingsScreen />
      </Container>
    </Container>
  );
}

export default App;
