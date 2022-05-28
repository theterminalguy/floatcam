const videoPlayer = document.getElementById("video-player");

function handleSetCameraResolution(data) {
  videoPlayer.style.width = data.width;
  videoPlayer.style.height = data.height;
}

function handleSetCameraShape(data) {
  videoPlayer.style.borderRadius = data.borderRadius;
  videoPlayer.style.width = data.width;
  videoPlayer.style.height = data.height;
}

function handleSetCameraMirror(data) {
  videoPlayer.style.transform = data.transform;
  videoPlayer.style["-webkit-transform"] = data["-webkit-transform"];
}

function handleSetBorderWidth(data) {
  videoPlayer.style.borderWidth = data;
}

function handleSetBorderStyle(data) {
  videoPlayer.style.borderStyle = data;
}

function handleSetBorderColor(data) {
  videoPlayer.style.borderColor = data;
}

function handleSetVideoStream(data) {
  const stream = window.videoStream;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  renderCamera(data);
}

function handleSetVideoFilter(data) {
  videoPlayer.style.filter = data.filter;
  videoPlayer.style["-webkit-filter"] = `-webkit-${data.filter}`;
}

const eventHandlers = {
  "set-camera-resolution": handleSetCameraResolution,
  "set-camera-shape": handleSetCameraShape,
  "set-camera-mirror": handleSetCameraMirror,
  "set-border-width": handleSetBorderWidth,
  "set-border-style": handleSetBorderStyle,
  "set-border-color": handleSetBorderColor,
  "set-video-stream": handleSetVideoStream,
  "set-video-filter": handleSetVideoFilter,
};

function renderCamera(constraints) {
  console.log("constraints", constraints);
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      const video = document.querySelector("video");
      window.videoStream = stream;
      video.srcObject = stream;
      video.onloadedmetadata = (_) => video.play();
    })
    .catch((err) => {
      console.log(err.name + ": " + err.message);
    });
}

window.addEventListener("DOMContentLoaded", function () {
  renderCamera({ video: true });

  window.electronAPI.onMessageReceived(
    "shared-window-channel",
    (_, message) => {
      const handler = eventHandlers[message.type];
      if (handler) {
        handler(message.payload);
      }
    }
  );
});
