const video = document.querySelector("video");
const videoPlayer = document.getElementById("video-player");

function handleSetCameraResolution(style) {
  videoPlayer.style.width = style.width;
  videoPlayer.style.height = style.height;
}

function handleSetCameraShape(style) {
  videoPlayer.style.borderRadius = style.borderRadius;
  videoPlayer.style.width = style.width;
  videoPlayer.style.height = style.height;
}

function handleSetCameraMirror(style) {
  videoPlayer.style.transform = style.transform;
  videoPlayer.style["-webkit-transform"] = style["-webkit-transform"];
}

function handleSetBorderWidth(borderWidth) {
  videoPlayer.style.borderWidth = borderWidth;
}

function handleSetBorderStyle(borderStyle) {
  videoPlayer.style.borderStyle = borderStyle;
}

function handleSetBorderColor(borderColor) {
  videoPlayer.style.borderColor = borderColor;
}

function handleSetVideoStream(constraints) {
  renderCamera(constraints);
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
  if (video.srcObject) {
    video.srcObject.getTracks().forEach((track) => track.stop());
  }
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.log(err.name + ": " + err.message);
    });
}

window.addEventListener("DOMContentLoaded", function () {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    const cams = devices.filter((device) => device.kind === "videoinput");
    window.electronAPI.sendSync("shared-window-channel", {
      type: "set-webcams",
      payload: JSON.stringify(cams),
    });
    const videoSource = cams[0].deviceId;
    const constraints = {
      video: {
        deviceId: {
          exact: videoSource,
        },
      },
    };
    renderCamera(constraints);
  });

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
