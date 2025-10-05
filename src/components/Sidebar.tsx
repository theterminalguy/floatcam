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
import ConfirmDialog from "./ConfirmDialog";

const { electronAPI } = window;

type PopoverType = "camera" | "size" | "flip" | "shape" | "filter" | "border" | null;

export default function Sidebar() {
  const [activePopover, setActivePopover] = useState<PopoverType>(null);
  const [popoverPosition, setPopoverPosition] = useState<number>(0);
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false);

  const togglePopover = (popover: PopoverType, event: React.MouseEvent<HTMLButtonElement>) => {
    if (activePopover === popover) {
      setActivePopover(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const popoverMaxHeight = 500; // Max height from CSS
      const paddingFromEdge = 20;

      // Calculate if popover would overflow bottom of window
      const spaceBelow = windowHeight - rect.top;
      const spaceAbove = rect.bottom;

      let calculatedTop: number;

      if (spaceBelow >= popoverMaxHeight + paddingFromEdge) {
        // Enough space below - align with button top
        calculatedTop = rect.top;
      } else if (spaceAbove >= popoverMaxHeight + paddingFromEdge) {
        // Not enough space below but enough above - align to fit above
        calculatedTop = Math.max(paddingFromEdge, rect.bottom - popoverMaxHeight);
      } else {
        // Limited space both ways - position to maximize visible area
        calculatedTop = Math.max(
          paddingFromEdge,
          Math.min(
            rect.top,
            windowHeight - popoverMaxHeight - paddingFromEdge
          )
        );
      }

      setPopoverPosition(calculatedTop);
      setActivePopover(popover);
    }
  };

  const handleReset = () => {
    // Reset all settings
    window.location.reload();
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    // Send message to main process to close all windows
    electronAPI.sendSync("shared-window-channel", {
      type: "exit-app",
      payload: "",
    });
  };

  const cancelExit = () => {
    setShowExitDialog(false);
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

      {/* Exit confirmation dialog */}
      <ConfirmDialog
        isOpen={showExitDialog}
        onConfirm={confirmExit}
        onCancel={cancelExit}
      />
    </div>
  );
}
