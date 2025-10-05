import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { SelectOption } from "../../types";

const { electronAPI } = window;

const borderStyles: SelectOption[] = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
  { value: "groove", label: "Groove" },
  { value: "ridge", label: "Ridge" },
  { value: "inset", label: "Inset" },
  { value: "outset", label: "Outset" },
];

function BorderStyle(): JSX.Element {
  const handleChange = (event: React.ChangeEvent<any>): void => {
    electronAPI.sendSync("shared-window-channel", {
      type: "set-border-style",
      payload: event.target.value,
    });
  };

  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoBorderStyle">
        <Form.Label>Style</Form.Label>
        <Form.Control as="select" onChange={handleChange}>
          {borderStyles.map((borderStyle) => (
            <option key={borderStyle.value} value={borderStyle.value}>
              {borderStyle.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default BorderStyle;
