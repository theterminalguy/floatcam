import React from "react";

function VideoPreview({videoRef}) {
  return (
    <div id="preview">
      <div id="preview-header">Click here to move</div>
      <video
        id="video-player"
        className="rounded-circle"
        autoPlay={true}
        playsInline={true}
        ref={videoRef}
      ></video>
    </div>
  );
}

export default VideoPreview;
