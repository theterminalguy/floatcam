import { useCameraContext } from "../../contexts/CameraContext";

const { electronAPI } = window;

export default function CameraPopover() {
  const { webcams, selectedCamera, setSelectedCamera } = useCameraContext();

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
