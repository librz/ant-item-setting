import React, { FC } from "react";

interface Props {
  condition: boolean;
}

const If: FC<Props> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

export default If;
