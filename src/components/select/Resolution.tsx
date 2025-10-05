import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { SelectOption } from "../../types";

interface ResolutionProps {
  resolutions: SelectOption[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

function Resolution({ resolutions, onChange }: ResolutionProps): JSX.Element {
  return (
    <Card.Text as="div">
      <Form.Group controlId="formVideoResolution">
        <Form.Label>Resolution</Form.Label>
        <Form.Control as="select" onChange={onChange}>
          {resolutions.map((resolution) => (
            <option key={resolution.value} value={resolution.value}>
              {resolution.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Text>
  );
}

export default Resolution;
