interface CameraStyle {
  width?: string;
  height?: string;
  borderRadius?: string;
  transform?: string;
  "-webkit-transform"?: string;
  filter?: string;
  "-webkit-filter"?: string;
}

interface WindowMessage {
  type: string;
  payload: CameraStyle | MediaStreamConstraints | string;
}

const video = document.querySelector("video") as HTMLVideoElement;
const videoPlayer = document.getElementById("video-player") as HTMLVideoElement;

function handleSetCameraResolution(style: CameraStyle): void {
  if (style.width) videoPlayer.style.width = style.width;
  if (style.height) videoPlayer.style.height = style.height;
}

function handleSetCameraShape(style: CameraStyle): void {
  if (style.borderRadius) videoPlayer.style.borderRadius = style.borderRadius;
  if (style.width) videoPlayer.style.width = style.width;
  if (style.height) videoPlayer.style.height = style.height;
}

function handleSetCameraMirror(style: CameraStyle): void {
  if (style.transform) videoPlayer.style.transform = style.transform;
  if (style["-webkit-transform"]) {
    videoPlayer.style.webkitTransform = style["-webkit-transform"];
  }
}

function handleSetBorderWidth(borderWidth: string): void {
  videoPlayer.style.borderWidth = borderWidth;
}

function handleSetBorderStyle(borderStyle: string): void {
  videoPlayer.style.borderStyle = borderStyle;
}

function handleSetBorderColor(borderColor: string): void {
  videoPlayer.style.borderColor = borderColor;
}

function handleSetVideoStream(constraints: MediaStreamConstraints): void {
  renderCamera(constraints);
}

function handleSetVideoFilter(data: CameraStyle): void {
  if (data.filter) {
    videoPlayer.style.filter = data.filter;
    videoPlayer.style.webkitFilter = `-webkit-${data.filter}`;
  }
}

const eventHandlers: Record<string, (payload: unknown) => void> = {
  "set-camera-resolution": (payload) => handleSetCameraResolution(payload as CameraStyle),
  "set-camera-shape": (payload) => handleSetCameraShape(payload as CameraStyle),
  "set-camera-mirror": (payload) => handleSetCameraMirror(payload as CameraStyle),
  "set-border-width": (payload) => handleSetBorderWidth(payload as string),
  "set-border-style": (payload) => handleSetBorderStyle(payload as string),
  "set-border-color": (payload) => handleSetBorderColor(payload as string),
  "set-video-stream": (payload) => handleSetVideoStream(payload as MediaStreamConstraints),
  "set-video-filter": (payload) => handleSetVideoFilter(payload as CameraStyle),
};

function renderCamera(constraints: MediaStreamConstraints): void {
  if (video.srcObject) {
    const tracks = (video.srcObject as MediaStream).getTracks();
    tracks.forEach((track) => track.stop());
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err: Error) => {
      console.error(err.name + ": " + err.message);
    });
}

/// <reference path="types.d.ts" />

window.addEventListener("DOMContentLoaded", () => {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    const cams = devices.filter((device) => device.kind === "videoinput");
    window.electronAPI.sendSync("shared-window-channel", {
      type: "set-webcams",
      payload: JSON.stringify(cams),
    });

    const videoSource = cams[0]?.deviceId;
    if (videoSource) {
      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: {
            exact: videoSource,
          },
        },
      };
      renderCamera(constraints);
    }
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
