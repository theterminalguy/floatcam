import { useState, useEffect } from "react";
import { WebcamDevice } from "../../types";

const { electronAPI } = window;

interface WindowMessage {
  type: string;
  payload: string;
}

export default function CameraPopover() {
  const [webcams, setWebcams] = useState<WebcamDevice[]>([
    { deviceId: "loading", label: "Loading..." },
  ]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  useEffect(() => {
    electronAPI.onMessageReceived("shared-window-channel", (_, message) => {
      const msg = message as WindowMessage;
      if (msg.type === "set-webcams") {
        const devices = JSON.parse(msg.payload) as WebcamDevice[];
        setWebcams(devices);
        if (devices.length > 0) {
          setSelectedCamera(devices[0].deviceId);
        }
      }
    });
  }, []);

  const handleChange = (deviceId: string): void => {
    setSelectedCamera(deviceId);
    const constraints: MediaStreamConstraints = {
      video: {
        deviceId: {
          exact: deviceId,
        },
      },
    };
    electronAPI.sendSync("shared-window-channel", {
      type: "set-video-stream",
      payload: constraints,
    });
  };

  return (
    <div className="popover">
      <div className="popover-title">Camera Source</div>
      {webcams.map((webcam) => (
        <button
          key={webcam.deviceId}
          className={`popover-menu-item ${selectedCamera === webcam.deviceId ? "selected" : ""}`}
          onClick={() => handleChange(webcam.deviceId)}
        >
          {webcam.label}
        </button>
      ))}
    </div>
  );
}
