import React from "react";
import { Button } from "./ui/button.tsx";
import { NavLink, Outlet, useLocation } from "react-router";

type NavLinks = {
  name: string;
  pathName: string;
}[];

const navLinks: NavLinks = [
  {
    name: "All",
    pathName: "/home",
  },
  {
    name: "Folder",
    pathName: "/home/folder",
  },
  {
    name: "Recent",
    pathName: "/home/recent",
  },
  {
    name: "Created by me",
    pathName: "/home/created-by-me",
  },
];

interface IfFileProps {
  listFiles: any[];
}

const AppSection = () => {
  const [listFiles, setListFiles] = React.useState([1]);

  return (
    <div className={"main-container mt-9 flex-1"}>
      {listFiles.length === 0 ? <IfNoFile /> : <IfFile />}
    </div>
  );
};
export default AppSection;

const IfNoFile = () => {
  const handleCreateFile = () => {
    console.log("create file");
  };

  return (
    <div className={"flex-center size-full select-none px-8 md:px-0"}>
      <div className={"w-full rounded-2xl border py-14 md:w-[600px]"}>
        <div className={"size-icon flex-center mx-auto mb-4"}>
          <img
            src={"/assets/icons/file.svg"}
            className={"size-full object-cover"}
          />
        </div>
        <div className={"text-center"}>
          <Button className={"capitalize"} onClick={handleCreateFile}>
            create a black file
          </Button>
        </div>
      </div>
    </div>
  );
};

const IfFile = () => {
  const { pathname } = useLocation();

  return (
    <div className={"flex size-full flex-col gap-y-8 px-4 md:px-0"}>
      <div className={"w-full rounded-md border border-tertiary px-4 py-2"}>
        <div>
          <ul className={"flex-start select-none flex-wrap gap-4 capitalize"}>
            {navLinks.map(({ pathName, name }) => {
              return (
                <li
                  key={pathName}
                  className={`rounded-md ${pathname === pathName && "bg-secondary"} px-8 py-1`}
                >
                  <NavLink
                    to={pathName}
                    className={
                      "text-quaternary transition-colors hover:text-tertiary"
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={"size-full flex-1"}>
        <Outlet />
      </div>
    </div>
  );
};
