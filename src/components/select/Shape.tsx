import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { SelectOption } from "../../types";

interface ShapeProps {
  shapes: SelectOption[];
  defaultShape?: string;
  onChange: (event: React.ChangeEvent<any>) => void;
}

function Shape({ shapes, onChange }: ShapeProps): JSX.Element {
  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoShape">
        <Form.Label>Shape</Form.Label>
        <Form.Control as="select" onChange={onChange}>
          {shapes.map((shape) => (
            <option key={shape.value} value={shape.value}>
              {shape.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default Shape;
