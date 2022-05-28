const video = document.getElementById("video-player");

function handleSetCameraResolution(data) {
  video.style.width = data.width;
  video.style.height = data.height;
}

function handleSetCameraShape(data) {
  video.style.borderRadius = data.borderRadius;
  video.style.width = data.width;
  video.style.height = data.height;
}

function handleSetCameraMirror(data) {
  video.style.transform = data.transform;
  video.style["-webkit-transform"] = data["-webkit-transform"];
}

function handleSetBorderWidth(data) {
  video.style.borderWidth = data;
}

function handleSetBorderStyle(data) {
  video.style.borderStyle = data;
}

function handleSetBorderColor(data) {
  video.style.borderColor = data;
}

const eventHandlers = {
  "set-camera-resolution": handleSetCameraResolution,
  "set-camera-shape": handleSetCameraShape,
  "set-camera-mirror": handleSetCameraMirror,
  "set-border-width": handleSetBorderWidth,
  "set-border-style": handleSetBorderStyle,
  "set-border-color": handleSetBorderColor,
};

window.addEventListener("DOMContentLoaded", function () {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      var video = document.querySelector("video");
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });

  window.electronAPI.onMessageReceived(
    "shared-window-channel",
    function (_, message) {
      const handler = eventHandlers[message.type];
      if (handler) {
        handler(message.payload);
      }
    }
  );
});
