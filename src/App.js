import React from "react";
import "./App.css";
//import logo from "./logo.svg";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Preview from "./components/Preview";
import CamSection from "./components/CamSection";
import BorderSection from "./components/BorderSection";

function SettingsScreen() {
  return (
    <Form>
      <CamSection />
      <BorderSection />
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
