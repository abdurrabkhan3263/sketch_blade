import React from "react";
import Container from "./Container";
import FolderTable from "../../components/Table/FolderTable.tsx";

const Folder = () => {
  return (
    <Container>
      <div className={"size-full"}>
        <FolderTable />
      </div>
    </Container>
  );
};
export default Folder;
