import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

const { electronAPI } = window;

const Camera = () => {
  const [errorOccurred, setErrorOccurred] = useState(false);

  const [webcams, setWebcams] = React.useState([
    { deviceId: "loading", label: "Loading..." },
  ]);

  useEffect(() => {
    electronAPI.onMessageReceived("shared-window-channel", (_, message) => {
      if (message.type === "set-webcams") {
        setWebcams(JSON.parse(message.payload));
      }
    });
  }, []);

  const handleChange = (event) => {
    const videoSource = event.target.value;
    const constraints = {
      video: {
        deviceId: {
          exact: videoSource,
        },
      },
    };
    electronAPI.sendSync("shared-window-channel", {
      type: "set-video-stream",
      payload: constraints,
    });
  };

  return (
    <div>
      {errorOccurred ? (
        <Alert
          variant="danger"
          onClose={() => setErrorOccurred(false)}
          dismissible
        >
          <Alert.Heading>An error occurred!</Alert.Heading>
          <p>
            Either you have not allowed access to your webcam or your browser
            does not support the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API"
              target="_blank"
              rel="noopener noreferrer"
            >
              WebRTC API
            </a>
            .
          </p>
        </Alert>
      ) : null}

      <Card.Text as="div">
        <Form.Group controlId="formCameraSource">
          <Form.Label>Camera</Form.Label>
          <Form.Control as="select" onChange={handleChange}>
            {webcams.map((webcam) => (
              <option key={webcam.deviceId} value={webcam.deviceId}>
                {webcam.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Card.Text>
    </div>
  );
};

export default Camera;
