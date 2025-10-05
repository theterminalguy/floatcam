import { SelectOption } from "../../types";

const { electronAPI } = window;

const borderWidths: SelectOption[] = [
  { value: "0", label: "None" },
  { value: "thin", label: "Thin" },
  { value: "medium", label: "Medium" },
  { value: "thick", label: "Thick" },
];

const borderStyles: SelectOption[] = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
];

export default function BorderPopover() {
  const handleWidthChange = (value: string): void => {
    electronAPI.sendSync("shared-window-channel", {
      type: "set-border-width",
      payload: value,
    });
  };

  const handleStyleChange = (value: string): void => {
    electronAPI.sendSync("shared-window-channel", {
      type: "set-border-style",
      payload: value,
    });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    electronAPI.sendSync("shared-window-channel", {
      type: "set-border-color",
      payload: event.target.value,
    });
  };

  return (
    <div className="popover">
      <div className="popover-title">Border</div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px", marginBottom: "6px", display: "block" }}>
          Width
        </label>
        <select
          className="popover-select"
          onChange={(e) => handleWidthChange(e.target.value)}
          defaultValue="0"
        >
          {borderWidths.map((width) => (
            <option key={width.value} value={width.value}>
              {width.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px", marginBottom: "6px", display: "block" }}>
          Style
        </label>
        <select
          className="popover-select"
          onChange={(e) => handleStyleChange(e.target.value)}
          defaultValue="solid"
        >
          {borderStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px", marginBottom: "6px", display: "block" }}>
          Color
        </label>
        <input
          type="color"
          id="video-border-color"
          className="color-picker"
          defaultValue="#499979"
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
}
