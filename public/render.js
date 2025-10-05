const video = document.querySelector("video");
const videoPlayer = document.getElementById("video-player");
function handleSetCameraResolution(style) {
    if (style.width)
        videoPlayer.style.width = style.width;
    if (style.height)
        videoPlayer.style.height = style.height;
}
function handleSetCameraShape(style) {
    if (style.borderRadius)
        videoPlayer.style.borderRadius = style.borderRadius;
    if (style.width)
        videoPlayer.style.width = style.width;
    if (style.height)
        videoPlayer.style.height = style.height;
}
function handleSetCameraMirror(style) {
    if (style.transform)
        videoPlayer.style.transform = style.transform;
    if (style["-webkit-transform"]) {
        videoPlayer.style.webkitTransform = style["-webkit-transform"];
    }
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
    if (data.filter) {
        videoPlayer.style.filter = data.filter;
        videoPlayer.style.webkitFilter = `-webkit-${data.filter}`;
    }
}
const eventHandlers = {
    "set-camera-resolution": (payload) => handleSetCameraResolution(payload),
    "set-camera-shape": (payload) => handleSetCameraShape(payload),
    "set-camera-mirror": (payload) => handleSetCameraMirror(payload),
    "set-border-width": (payload) => handleSetBorderWidth(payload),
    "set-border-style": (payload) => handleSetBorderStyle(payload),
    "set-border-color": (payload) => handleSetBorderColor(payload),
    "set-video-stream": (payload) => handleSetVideoStream(payload),
    "set-video-filter": (payload) => handleSetVideoFilter(payload),
};
function renderCamera(constraints) {
    if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
    }
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
        .catch((err) => {
        console.error(err.name + ": " + err.message);
    });
}
/// <reference path="types.d.ts" />
function sendWebcamList() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        const cams = devices.filter((device) => device.kind === "videoinput");
        window.electronAPI.sendSync("shared-window-channel", {
            type: "set-webcams",
            payload: JSON.stringify(cams),
        });
    });
}
window.addEventListener("DOMContentLoaded", () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        const cams = devices.filter((device) => device.kind === "videoinput");
        window.electronAPI.sendSync("shared-window-channel", {
            type: "set-webcams",
            payload: JSON.stringify(cams),
        });
        const videoSource = cams[0]?.deviceId;
        if (videoSource) {
            const constraints = {
                video: {
                    deviceId: {
                        exact: videoSource,
                    },
                },
            };
            renderCamera(constraints);
        }
    });
    window.electronAPI.onMessageReceived("shared-window-channel", (_, message) => {
        // Handle request for webcam list
        if (message.type === "request-webcams") {
            sendWebcamList();
            return;
        }
        const handler = eventHandlers[message.type];
        if (handler) {
            handler(message.payload);
        }
    });
});
