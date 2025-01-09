import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className={
        "absolute left-8 top-1/4 h-fit w-fit translate-y-1/4 rounded-lg bg-secondary p-3"
      }
    >
      {children}
    </div>
  );
};
export default Container;
