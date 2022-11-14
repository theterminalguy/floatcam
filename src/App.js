import React from "react";
import "./App.css";
import logo from "./floatcam.jpg";

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
        <h1 className="header" style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="FloatCam Logo"
            height="65px"
            width="65px"
            style={{ borderRadius: "50%" }}
          />
        </h1>
        <h1 className="header" style={{ textAlign: "center" }}>
          floatcam
        </h1>
        <SettingsScreen />
      </Container>
    </Container>
  );
}

export default App;
