import React from "react";

const Nav = () => {
  return (
    <nav className={"w-full h-20 px-12 flex items-center"}>
      <div className={"flex items-center justify-between size-full"}>
        <div>Logo</div>
        <div>User</div>
      </div>
    </nav>
  );
};
export default Nav;

const MobileNav = () => {
  return (
    <nav className={"w-full h-20 flex items-center justify-between px-12 "}>
      Nav
      <div>hello</div>
    </nav>
  );
};
