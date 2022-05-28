function handleSetCameraResolution(data) {
  const video = document.getElementById("video-player");
  video.style.width = data.width;
  video.style.height = data.height;
}

const eventHandlers = {
  "set-camera-resolution": handleSetCameraResolution,
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
