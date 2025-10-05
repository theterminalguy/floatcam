import { SelectOption } from "../../types";

const { electronAPI } = window;

const filters: SelectOption[] = [
  { value: "none", label: "None" },
  { value: "blur(3px)", label: "Blurry" },
  { value: "brightness(1.3)", label: "Bright" },
  { value: "brightness(2.3)", label: "Brighter" },
  { value: "contrast(150%)", label: "Pop" },
  { value: "grayscale(100%)", label: "No Color" },
  { value: "hue-rotate(180deg)", label: "Tola (Anne)" },
  { value: "invert(100%)", label: "Ghost" },
  { value: "opacity(50%)", label: "Transparent" },
  { value: "saturate(7)", label: "Mars" },
  { value: "sepia(100%)", label: "Mexico" },
  { value: "drop-shadow(8px 8px 10px %s)", label: "Shadow" },
];

export default function FilterPopover() {
  const handleChange = (filterValue: string): void => {
    let filter = filterValue;
    const style: { filter: string; "-webkit-filter": string } = {
      filter: "",
      "-webkit-filter": "",
    };

    if (filter === "drop-shadow(8px 8px 10px %s)") {
      const videoBorderColorElement = document.getElementById(
        "video-border-color"
      ) as HTMLInputElement;
      const videoBorderColor = videoBorderColorElement?.value || "#000000";
      filter = `drop-shadow(8px 8px 10px ${videoBorderColor})`;
    }

    style.filter = filter;
    style["-webkit-filter"] = `-webkit-${filter}`;

    electronAPI.sendSync("shared-window-channel", {
      type: "set-video-filter",
      payload: style,
    });
  };

  return (
    <div className="popover">
      <div className="popover-title">Filter</div>
      <select
        className="popover-select"
        onChange={(e) => handleChange(e.target.value)}
        defaultValue="none"
      >
        {filters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
}
