import { File } from "../../../lib/Types";
import { DataTable } from "./Data-table.tsx";
import { columns } from "./Columns.tsx";

const data: File[] = [
  {
    _id: "675bd059d4bbbdce6369c563",
    file_name: "First First Firstfffffflllllll",
    active_collaborators: [
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
    ],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-13T06:12:41.120Z",
  },
  {
    _id: "675c4025ddeb1f5126bcaa02",
    file_name: "First Folder Col",
    active_collaborators: [],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-13T14:09:41.619Z",
    updatedAt: "2024-12-13T14:09:41.619Z",
  },
  {
    _id: "675bd51d8e22be4a8a3aa01b",
    file_name: "First Folder Col",
    active_collaborators: [
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
    ],
    createdAt: "2024-12-13T06:33:01.344Z",
    updatedAt: "2024-12-13T06:33:01.344Z",
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
  },
  {
    _id: "675c41bb300f135c552751d3",
    file_name: "First Folder Col",
    active_collaborators: [],
    createdAt: "2024-12-13T14:16:27.805Z",
    updatedAt: "2024-12-13T14:16:27.805Z",
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
  },
  {
    _id: "675d0fff37023d1de92c9f60",
    file_name: "Second Folder Col",
    active_collaborators: [],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-14T04:56:31.268Z",
  },
  {
    _id: "675bd059d4bbbdce6369c563",
    file_name: "First First Firstfffffflllllll",
    active_collaborators: [
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
    ],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-13T06:12:41.120Z",
  },
  {
    _id: "675c4025ddeb1f5126bcaa02",
    file_name: "First Folder Col",
    active_collaborators: [],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-13T14:09:41.619Z",
    updatedAt: "2024-12-13T14:09:41.619Z",
  },
  {
    _id: "675bd51d8e22be4a8a3aa01b",
    file_name: "First Folder Col",
    active_collaborators: [
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
    ],
    createdAt: "2024-12-13T06:33:01.344Z",
    updatedAt: "2024-12-13T06:33:01.344Z",
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
  },
  {
    _id: "675c41bb300f135c552751d3",
    file_name: "First Folder Col",
    active_collaborators: [],
    createdAt: "2024-12-13T14:16:27.805Z",
    updatedAt: "2024-12-13T14:16:27.805Z",
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
  },
  {
    _id: "675d0fff37023d1de92c9f60",
    file_name: "Second Folder Col",
    active_collaborators: [],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-14T04:56:31.268Z",
  },
  {
    _id: "675bd059d4bbbdce6369c563",
    file_name: "First First Firstfffffflllllll",
    active_collaborators: [
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
    ],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-13T06:12:41.120Z",
  },
  {
    _id: "675c4025ddeb1f5126bcaa02",
    file_name: "First Folder Col",
    active_collaborators: [],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-13T14:09:41.619Z",
    updatedAt: "2024-12-13T14:09:41.619Z",
  },
  {
    _id: "675bd51d8e22be4a8a3aa01b",
    file_name: "First Folder Col",
    active_collaborators: [
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
    ],
    createdAt: "2024-12-13T06:33:01.344Z",
    updatedAt: "2024-12-13T06:33:01.344Z",
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
  },
  {
    _id: "675c41bb300f135c552751d3",
    file_name: "First Folder Col",
    active_collaborators: [],
    createdAt: "2024-12-13T14:16:27.805Z",
    updatedAt: "2024-12-13T14:16:27.805Z",
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
  },
  {
    _id: "675d0fff37023d1de92c9f60",
    file_name: "Second Folder Col",
    active_collaborators: [],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-14T04:56:31.268Z",
  },
  {
    _id: "675bd059d4bbbdce6369c563",
    file_name: "First First Firstfffffflllllll",
    active_collaborators: [
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
    ],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-13T06:12:41.120Z",
  },
  {
    _id: "675c4025ddeb1f5126bcaa02",
    file_name: "First Folder Col",
    active_collaborators: [],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-13T14:09:41.619Z",
    updatedAt: "2024-12-13T14:09:41.619Z",
  },
  {
    _id: "675bd51d8e22be4a8a3aa01b",
    file_name: "First Folder Col",
    active_collaborators: [
      {
        profile_url:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycTNQUTR1QTdDaVp6dnpUS0ozVUltWGNMRWMifQ",
        full_name: "Raheem Khan",
      },
    ],
    createdAt: "2024-12-13T06:33:01.344Z",
    updatedAt: "2024-12-13T06:33:01.344Z",
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
  },
  {
    _id: "675c41bb300f135c552751d3",
    file_name: "First Folder Col",
    active_collaborators: [],
    createdAt: "2024-12-13T14:16:27.805Z",
    updatedAt: "2024-12-13T14:16:27.805Z",
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
  },
  {
    _id: "675d0fff37023d1de92c9f60",
    file_name: "Second Folder Col",
    active_collaborators: [],
    creator: {
      profile_url:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycFpVUGkxbWY0bUJLTWtEejU2NFd6RWNqMXkiLCJyaWQiOiJ1c2VyXzJxM0xGSzhyMVFpcTlCdTVlTUR6T1BHQmkwTyIsImluaXRpYWxzIjoiQUsifQ",
      full_name: "Abdur Rab Khan",
    },
    createdAt: "2024-12-14T04:56:31.268Z",
  },
];

const FilesTable = () => {
  return (
    <div className={"size-full"}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default FilesTable;
