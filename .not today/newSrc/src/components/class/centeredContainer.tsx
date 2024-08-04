import React from "react";

interface CenteredContainerProps {
  children: React.ReactNode;
}

const CenteredContainer = ({ children }: CenteredContainerProps) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

export default CenteredContainer;
