import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import VideoPreview from "./VideoPreview";

const Camera = () => {
  const videoRef = useRef(null);
  const [errorOccurred, setErrorOccurred] = useState(true);

  const [userApproved, setUserApproved] = useState(false);
  const [webcams, setWebcams] = React.useState([
    { deviceId: "loading", label: "Loading..." },
  ]);

  const getWebcams = (streaming) => {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      const webcamList = devices.filter(function (device) {
        return device.kind === "videoinput";
      });
      if (streaming) {
        setWebcams(webcamList);
      }
    });
  };

  const askForPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setErrorOccurred(false);
              setUserApproved(true);
            })
            .catch((_error) => {
              setErrorOccurred(true);
            });
        }
      })
      .catch((error) => {
        console.log("navigator.getUserMedia error: ", error);
      });
  };

  useEffect(() => {
    askForPermission();
    getWebcams(userApproved);
  }, [userApproved]);

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

      <VideoPreview videoRef={videoRef} />
      <Card.Text as="div">
        <Form.Group controlId="formCameraSource">
          <Form.Label>Camera</Form.Label>
          <Form.Control as="select">
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
