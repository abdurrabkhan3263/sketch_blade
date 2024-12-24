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
    name: "Created by me",
    pathName: "/home/created-by-me",
  },
];

const AppSection = () => {
  const { pathname } = useLocation();

  return (
    <div className={"main-container"} style={{ height: "calc(100vh - 5rem)" }}>
      <div className={"flex size-full flex-col gap-y-5 px-4 pt-9 md:px-0"}>
        <div className={"flex w-full flex-col gap-y-4 overflow-y-hidden"}>
          <div className={"w-full rounded-md border border-tertiary px-4 py-2"}>
            <div>
              <ul
                className={"flex-start select-none flex-wrap gap-4 capitalize"}
              >
                {navLinks.map(({ pathName, name }) => {
                  return (
                    <li
                      key={pathName}
                      className={`rounded-md ${pathname === pathName && "bg-secondary"} py-1.5 text-sm`}
                    >
                      <NavLink
                        to={pathName}
                        className={
                          "px-8 text-quaternary transition-colors hover:text-tertiary"
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
          <div className={"w-full text-end"}>
            <Button className={"bg-tertiary"}>
              Create File
              <span className={"h-6 w-6"}>
                <img
                  src={"/assets/icons/add.svg"}
                  className={"size-full object-cover"}
                />
              </span>
            </Button>
          </div>
        </div>
        <div className={"size-full flex-1 overflow-y-auto"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AppSection;
