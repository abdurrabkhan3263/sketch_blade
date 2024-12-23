import { File } from "../../lib/Types";
import { DataTable } from "./Data-table.tsx";
import { fileColumns } from "./FileColumns.tsx";

const data: File[] = [];

const FilesTable = () => {
  return <DataTable columns={fileColumns} data={data} />;
};
export default FilesTable;
