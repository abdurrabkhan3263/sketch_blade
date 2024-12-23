import React from "react";
import AuthBtn from "./AuthBtn.tsx";

const Nav = () => {
  return (
    <nav className={"flex h-20 w-full items-center px-12"}>
      <div className={"flex size-full items-center justify-between"}>
        <div>Logo</div>
        <div>
          <AuthBtn />
        </div>
      </div>
    </nav>
  );
};
export default Nav;

const MobileNav = () => {
  return (
    <nav className={"flex h-20 w-full items-center justify-between px-12"}>
      Nav
      <div>hello</div>
    </nav>
  );
};
