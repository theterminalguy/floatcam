import { SelectOption } from "../../types";

const { electronAPI } = window;

const defaultResolutionOptions: SelectOption[] = [
  { value: "100px", label: "100 × 100" },
  { value: "150px", label: "150 × 150" },
  { value: "200px", label: "200 × 200" },
  { value: "250px", label: "250 × 250" },
  { value: "300px", label: "300 × 300" },
  { value: "350px", label: "350 × 350" },
  { value: "400px", label: "400 × 400" },
];

export default function SizePopover() {
  const handleResolutionChange = (size: string): void => {
    electronAPI.sendSync("shared-window-channel", {
      type: "set-camera-resolution",
      payload: { width: size, height: size },
    });
  };

  return (
    <div className="popover">
      <div className="popover-title">Camera Size</div>
      <select
        className="popover-select"
        onChange={(e) => handleResolutionChange(e.target.value)}
        defaultValue="100px"
      >
        {defaultResolutionOptions.map((resolution) => (
          <option key={resolution.value} value={resolution.value}>
            {resolution.label}
          </option>
        ))}
      </select>
    </div>
  );
}
