import Container from "./Container.tsx";
import FilesTable from "../../components/Table/FilesTable.tsx";

const Recent = () => {
  return (
    <Container>
      <div className={"size-full"}>
        <FilesTable type={"recent"} />
      </div>
    </Container>
  );
};
export default Recent;
