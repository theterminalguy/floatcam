import React from "react";

function Preview() {
  return (
    <div id="preview">
      <div id="preview-header">Click here to move</div>
      <video
        id="video-player"
        className="rounded-circle"
        autoPlay={true}
        playsInline={true}
      ></video>
    </div>
  );
}

export default Preview;
