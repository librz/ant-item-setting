import React from "react";
import { Alert } from "antd";

interface Props {
  desc: string[];
  style?: React.CSSProperties;
}

const Section: React.FC<Props> = ({ desc, children, style = {} }) => {
  return (
    <div
      style={{
        border: "1px solid silver",
        borderRadius: 5,
        margin: 30,
        padding: 24,
        ...style,
      }}
    >
      {children}
      {desc.map((item, index) => {
        return (
          <Alert
            key={index}
            type="info"
            message={item}
            style={{ marginTop: 12 }}
          />
        );
      })}
    </div>
  );
};

export default Section;
