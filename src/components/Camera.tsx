import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { WebcamDevice } from "../types";

const { electronAPI } = window;

interface WindowMessage {
  type: string;
  payload: string;
}

const Camera: React.FC = () => {
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [webcams, setWebcams] = useState<WebcamDevice[]>([
    { deviceId: "loading", label: "Loading..." },
  ]);

  useEffect(() => {
    electronAPI.onMessageReceived("shared-window-channel", (_, message) => {
      const msg = message as WindowMessage;
      if (msg.type === "set-webcams") {
        setWebcams(JSON.parse(msg.payload) as WebcamDevice[]);
      }
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<any>): void => {
    const videoSource = (event.target as HTMLSelectElement).value;
    const constraints: MediaStreamConstraints = {
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
