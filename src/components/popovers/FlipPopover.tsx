import { useState } from "react";
import { CameraStyle } from "../../types";

const { electronAPI } = window;

export default function FlipPopover() {
  const [isMirrored, setIsMirrored] = useState<boolean>(false);

  const handleMirrorToggle = (): void => {
    const newMirrorState = !isMirrored;
    setIsMirrored(newMirrorState);
    const style: CameraStyle = {};

    if (newMirrorState) {
      style.transform = "scaleX(-1)";
      style["-webkit-transform"] = "-webkit-scaleX(-1)";
    } else {
      style.transform = "scaleX(1)";
      style["-webkit-transform"] = "scaleX(1)";
    }

    electronAPI.sendSync("shared-window-channel", {
      type: "set-camera-mirror",
      payload: style,
    });
  };

  return (
    <div className="popover">
      <div className="popover-title">Flip Camera</div>
      <div className="toggle-wrapper">
        <span>Mirror Recording</span>
        <div
          className={`toggle-switch ${isMirrored ? "active" : ""}`}
          onClick={handleMirrorToggle}
        >
          <div className="toggle-switch-handle" />
        </div>
      </div>
    </div>
  );
}
