import { useState } from "react";
import {
  Camera,
  Maximize2,
  RefreshCw,
  Triangle,
  Droplet,
  Square,
  RotateCcw,
  X,
} from "lucide-react";
import CameraPopover from "./popovers/CameraPopover";
import SizePopover from "./popovers/SizePopover";
import FlipPopover from "./popovers/FlipPopover";
import ShapePopover from "./popovers/ShapePopover";
import FilterPopover from "./popovers/FilterPopover";
import BorderPopover from "./popovers/BorderPopover";

type PopoverType = "camera" | "size" | "flip" | "shape" | "filter" | "border" | null;

export default function Sidebar() {
  const [activePopover, setActivePopover] = useState<PopoverType>(null);

  const togglePopover = (popover: PopoverType) => {
    setActivePopover(activePopover === popover ? null : popover);
  };

  const handleReset = () => {
    // Reset all settings
    window.location.reload();
  };

  const handleExit = () => {
    window.close();
  };

  return (
    <div className="sidebar">
      {/* Camera Source */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "camera" ? "active" : ""}`}
          onClick={() => togglePopover("camera")}
          title="Select Camera Source"
        >
          <Camera />
        </button>
        {activePopover === "camera" && <CameraPopover />}
      </div>

      {/* Camera Size */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "size" ? "active" : ""}`}
          onClick={() => togglePopover("size")}
          title="Choose Camera Size"
        >
          <Maximize2 />
        </button>
        {activePopover === "size" && <SizePopover />}
      </div>

      {/* Flip Camera */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "flip" ? "active" : ""}`}
          onClick={() => togglePopover("flip")}
          title="Flip Camera"
        >
          <RefreshCw />
        </button>
        {activePopover === "flip" && <FlipPopover />}
      </div>

      <div className="sidebar-divider" />

      {/* Camera Shape */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "shape" ? "active" : ""}`}
          onClick={() => togglePopover("shape")}
          title="Select Camera Shape"
        >
          <div style={{ display: "flex", gap: "2px" }}>
            <Triangle size={12} />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", border: "2px solid white" }} />
              <Square size={12} />
            </div>
          </div>
        </button>
        {activePopover === "shape" && <ShapePopover />}
      </div>

      {/* Filter */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "filter" ? "active" : ""}`}
          onClick={() => togglePopover("filter")}
          title="Filter"
        >
          <Droplet />
        </button>
        {activePopover === "filter" && <FilterPopover />}
      </div>

      <div className="sidebar-divider" />

      {/* Border */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "border" ? "active" : ""}`}
          onClick={() => togglePopover("border")}
          title="Border"
        >
          <Square style={{ strokeDasharray: "4 4" }} />
        </button>
        {activePopover === "border" && <BorderPopover />}
      </div>

      {/* Reset Changes */}
      <button
        className="sidebar-button"
        onClick={handleReset}
        title="Reset Changes"
      >
        <RotateCcw />
      </button>

      {/* Exit */}
      <button
        className="sidebar-button"
        onClick={handleExit}
        title="Exit Floatcam"
      >
        <X />
      </button>
    </div>
  );
}
