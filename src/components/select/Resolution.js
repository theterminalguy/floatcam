import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function Resolution() {
  const resolutions = [
    {
      value: "100px",
      label: "100 X 100",
    },
    {
      value: "150px",
      label: "150 X 150",
    },
    {
      value: "200px",
      label: "200 X 200",
    },
    {
      value: "250px",
      label: "250 X 250",
    },
    {
      value: "300px",
      label: "300 X 300",
    },
    {
      value: "350px",
      label: "350 X 350",
    },
    {
      value: "400px",
      label: "400 X 400",
    },
  ];

  const handleOnChange = (e) => {
    const video = document.getElementById("video-player");
    const size = e.target.value;
    video.style.width = size;
    video.style.height = size;
  };

  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoResolution">
        <Form.Label>Resolution</Form.Label>
        <Form.Control as="select" onChange={handleOnChange}>
          {resolutions.map((resolution) => (
            <option key={resolution.value} value={resolution.value}>
              {resolution.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default Resolution;
