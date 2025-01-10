import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className={
        "absolute left-8 top-0 z-20 h-fit w-fit translate-y-1/4 rounded-lg bg-secondary p-3"
      }
    >
        <div className={"size-full flex flex-col gap-y-3"}>
            {children}
        </div>
    </div>
  );
};
export default Container;
