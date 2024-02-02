import { Comment, Recommend } from "features";
import { Container } from "react-bootstrap";
import TitleContent from "./components/TitleContent";

function Title() {
  return (
    <>
      <TitleContent />
      <Container fluid="md">
        <Comment />
      </Container>
      <Recommend />
    </>
  );
}

export default Title;
