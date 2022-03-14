/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
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

function adjustVideoSize(size) {
  // if camera is not open, do nothing
  if (window.stream === undefined) {
    console.log("camera is not open");
    return;
  }
  document.querySelector("#video-player").style.width = size;
  document.querySelector("#video-player").style.height = size;
}

function setResolution(_e) {
  const size = document.querySelector("#resolution").value;
  adjustVideoSize(size);
}
