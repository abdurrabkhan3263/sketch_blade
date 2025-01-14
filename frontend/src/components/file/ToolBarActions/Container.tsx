import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className={
    "absolute left-0 top-0 z-20 h-fit w-fit rounded-lg bg-secondary p-4 min-w-[12.5rem]"
      }
    >
        <div className={"size-full flex flex-col gap-y-4"}>
            {children}
        </div>
    </div>
  );
};
export default Container;
