"use strict";

// Put variables in global scope to make them available to the browser console.
const constraints = (window.constraints = {
  audio: false,
  video: true,
});

function handleSuccess(stream) {
  const video = document.querySelector("video");
  const videoTracks = stream.getVideoTracks();
  console.log("Got stream with constraints:", constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === "OverconstrainedError") {
    const v = constraints.video;
    errorMsg(
      `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
    );
  } else if (error.name === "NotAllowedError") {
    errorMsg(
      "Permissions have not been granted to use your camera and " +
        "microphone, you need to allow the page access to your devices in " +
        "order for the demo to work."
    );
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector("#error-message");
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== "undefined") {
    console.error(error);
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}

document
  .querySelector("#open-camera")
  .addEventListener("click", (e) => init(e));

function isCameraOpen() {
  return window.stream !== undefined;
}

function adjustVideoSize(width, height) {
  // if camera is not open, do nothing
  if (!isCameraOpen()) {
    // TODO: show error message
    console.log("camera is not open");
    return;
  }
  document.querySelector("#video-player").style.width = width;
  document.querySelector("#video-player").style.height = height;
}

function setResolution(_e) {
  const shape = document.querySelector("#shapes").value;
  if (shape === "rectangle") {
    const size = document.querySelector("#rect-resolutions").value;
    // remove border radius from video player
    document.querySelector("#video-player").style.borderRadius = "0px";
    const [width, height] = size.split("|");
    console.log(width, height);
    adjustVideoSize(width, height);
  } else {
    const size = document.querySelector("#resolutions").value;
    adjustVideoSize(size, size);
  }
}

function setShape(_e) {
  if (!isCameraOpen()) {
    // TODO: show error message
    console.log("camera is not open");
    return;
  }
  toggleSizeSelectOption();
  setResolution(null);
}

function toggleSizeSelectOption() {
  const shape = document.querySelector("#shapes").value;
  if (shape === "rectangle") {
    document.querySelector("#primary-sizes").style.display = "none";
    document.querySelector("#secondary-sizes").style.display = "block";
  } else {
    document.querySelector("#primary-sizes").style.display = "block";
    document.querySelector("#secondary-sizes").style.display = "none";
  }
}
