import { Circle, Square, RectangleHorizontal } from "lucide-react";
import { CameraStyle } from "../../types";

const { electronAPI } = window;

export default function ShapePopover() {
  const handleShapeChange = (shape: string): void => {
    const style: CameraStyle = {};

    switch (shape) {
      case "circle":
        style.borderRadius = "50%";
        style.width = "100px";
        style.height = "100px";
        break;
      case "square":
        style.borderRadius = "0";
        style.width = "100px";
        style.height = "100px";
        break;
      case "rectangle":
        style.width = "250px";
        style.height = "100px";
        style.borderRadius = "0";
        break;
      default:
        break;
    }

    electronAPI.sendSync("shared-window-channel", {
      type: "set-camera-shape",
      payload: style,
    });
  };

  return (
    <div className="popover">
      <div className="popover-title">Camera Shape</div>
      <button
        className="popover-menu-item"
        onClick={() => handleShapeChange("circle")}
      >
        <Circle size={16} />
        Circle
      </button>
      <button
        className="popover-menu-item"
        onClick={() => handleShapeChange("square")}
      >
        <Square size={16} />
        Square
      </button>
      <button
        className="popover-menu-item"
        onClick={() => handleShapeChange("rectangle")}
      >
        <RectangleHorizontal size={16} />
        Rectangle
      </button>
    </div>
  );
}
