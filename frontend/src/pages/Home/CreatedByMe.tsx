import Container from "./Container.tsx";
import FilesTable from "../../components/Table/FilesTable.tsx";

const CreatedByMe = () => {
  return (
    <Container>
      <div className={"size-full"}>
        <FilesTable type={"my"} />
      </div>
    </Container>
  );
};
export default CreatedByMe;
