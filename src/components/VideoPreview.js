import React from "react";

function VideoPreview({ videoRef }) {
  return (
    <div id="preview">
      <div id="preview-header">Click here to move</div>
      <video
        id="video-player"
        autoPlay={true}
        playsInline={true}
        ref={videoRef}
        style={{
          borderWidth: "0px",
          borderStyle: "solid",
        }}
      ></video>
    </div>
  );
}

export default VideoPreview;
