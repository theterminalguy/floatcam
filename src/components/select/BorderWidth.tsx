import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { SelectOption } from "../../types";

const { electronAPI } = window;

const borderWidths: SelectOption[] = [
  { value: "0", label: "None" },
  { value: "thin", label: "Thin" },
  { value: "medium", label: "Medium" },
  { value: "thick", label: "Thick" },
];

function BorderWidth(): JSX.Element {
  const handleChange = (event: React.ChangeEvent<any>): void => {
    electronAPI.sendSync("shared-window-channel", {
      type: "set-border-width",
      payload: event.target.value,
    });
  };

  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoBorderWidth">
        <Form.Label>Width</Form.Label>
        <Form.Control as="select" onChange={handleChange}>
          {borderWidths.map((borderWidth) => (
            <option key={borderWidth.value} value={borderWidth.value}>
              {borderWidth.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default BorderWidth;
