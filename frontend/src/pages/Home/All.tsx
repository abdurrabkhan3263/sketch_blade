import React from "react";
import Container from "./Container.tsx";
import FilesTable from "../../components/Table/File/FilesTable.tsx";

const All = () => {
  return (
    <Container>
      <div className={"size-full"}>
        <FilesTable />
      </div>
    </Container>
  );
};
export default All;
