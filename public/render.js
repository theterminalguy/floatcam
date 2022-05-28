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

const eventHandlers = {
  "set-camera-resolution": handleSetCameraResolution,
  "set-camera-shape": handleSetCameraShape,
  "set-camera-mirror": handleSetCameraMirror,
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
