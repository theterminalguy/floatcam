import React from "react";
import "./App.css";
//import logo from "./logo.svg";

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
        <h1 className="header">floatcam 📸</h1>
        <sup>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          in Canada{" "}
          <span role="img" aria-label="flag">
            🇨🇦
          </span>{" "}
          <span className="text-muted">by @theterminalguy</span>
        </sup>
        <SettingsScreen />
      </Container>
    </Container>
  );
}

export default App;
