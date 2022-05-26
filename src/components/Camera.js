import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
//import VideoPreview from "./VideoPreview";

const Camera = () => {
  const videoRef = useRef(null);
  const [errorOccurred, setErrorOccurred] = useState(true);

  const [userApproved, setUserApproved] = useState(false);
  const [webcams, setWebcams] = React.useState([
    { deviceId: "loading", label: "Loading..." },
  ]);

  const [videoStream, setVideoStream] = useState(null);

  const handleError = (error) => {
    setErrorOccurred(true);
    console.log("navigator.getUserMedia error: ", error);
  };

  const getWebcams = (streaming) => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        const webcamList = devices.filter(function (device) {
          return device.kind === "videoinput";
        });
        if (streaming) {
          setWebcams(webcamList);
        }
      })
      .catch(handleError);
  };

  const askForPermission = (constraints) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        let video = videoRef.current;
        setVideoStream(stream);
        video.srcObject = stream;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setErrorOccurred(false);
              setUserApproved(true);
            })
            .catch(handleError);
        }
      })
      .catch(handleError);
  };

  useEffect(() => {
    askForPermission({ video: true });
    getWebcams(userApproved);
  }, [userApproved]);

  const handleChange = (event) => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    const videoSource = event.target.value;
    const constraints = {
      video: { deviceId: videoSource },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(() => askForPermission(constraints))
      .catch(handleError);
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

      {/* <VideoPreview videoRef={videoRef} /> */}
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
