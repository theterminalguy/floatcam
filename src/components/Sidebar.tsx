import { useState, useRef } from "react";
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
  const [popoverPosition, setPopoverPosition] = useState<number>(0);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const togglePopover = (popover: PopoverType, event: React.MouseEvent<HTMLButtonElement>) => {
    if (activePopover === popover) {
      setActivePopover(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setPopoverPosition(rect.top);
      setActivePopover(popover);
    }
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
          onClick={(e) => togglePopover("camera", e)}
          title="Select Camera Source"
        >
          <Camera />
        </button>
      </div>

      {/* Camera Size */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "size" ? "active" : ""}`}
          onClick={(e) => togglePopover("size", e)}
          title="Choose Camera Size"
        >
          <Maximize2 />
        </button>
      </div>

      {/* Flip Camera */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "flip" ? "active" : ""}`}
          onClick={(e) => togglePopover("flip", e)}
          title="Flip Camera"
        >
          <RefreshCw />
        </button>
      </div>

      <div className="sidebar-divider" />

      {/* Camera Shape */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "shape" ? "active" : ""}`}
          onClick={(e) => togglePopover("shape", e)}
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
      </div>

      {/* Filter */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "filter" ? "active" : ""}`}
          onClick={(e) => togglePopover("filter", e)}
          title="Filter"
        >
          <Droplet />
        </button>
      </div>

      <div className="sidebar-divider" />

      {/* Border */}
      <div style={{ position: "relative" }}>
        <button
          className={`sidebar-button ${activePopover === "border" ? "active" : ""}`}
          onClick={(e) => togglePopover("border", e)}
          title="Border"
        >
          <Square style={{ strokeDasharray: "4 4" }} />
        </button>
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

      {/* Render active popover with calculated position */}
      {activePopover === "camera" && (
        <div style={{ position: "fixed", top: `${popoverPosition}px`, left: "100px" }}>
          <CameraPopover />
        </div>
      )}
      {activePopover === "size" && (
        <div style={{ position: "fixed", top: `${popoverPosition}px`, left: "100px" }}>
          <SizePopover />
        </div>
      )}
      {activePopover === "flip" && (
        <div style={{ position: "fixed", top: `${popoverPosition}px`, left: "100px" }}>
          <FlipPopover />
        </div>
      )}
      {activePopover === "shape" && (
        <div style={{ position: "fixed", top: `${popoverPosition}px`, left: "100px" }}>
          <ShapePopover />
        </div>
      )}
      {activePopover === "filter" && (
        <div style={{ position: "fixed", top: `${popoverPosition}px`, left: "100px" }}>
          <FilterPopover />
        </div>
      )}
      {activePopover === "border" && (
        <div style={{ position: "fixed", top: `${popoverPosition}px`, left: "100px" }}>
          <BorderPopover />
        </div>
      )}
    </div>
  );
}
