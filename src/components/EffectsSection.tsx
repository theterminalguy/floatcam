import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import VideoFilter from "./select/Filter";

function EffectsSection(): JSX.Element {
  return (
    <Container className="p-3">
      <Card>
        <Card.Body>
          <Card.Title>Effects</Card.Title>
          <VideoFilter />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EffectsSection;
