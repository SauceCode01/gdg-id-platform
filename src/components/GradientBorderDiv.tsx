import React from "react";

type Props = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  cornerRadius?: string; // in px
  borderThickness?: string; // in px
};

//  PLACEHOLDER PALANG
export const GradientBorderDiv = ({
  children,
  cornerRadius = "0px",
  borderThickness = "2px",
}: Props) => {
  return (
    <div
      style={{
        borderRadius: cornerRadius,
        padding: borderThickness,
      }}
      className=" bg-gradient-to-r from-pink-500 to-yellow-200"
    >
      <div
        style={{
          borderRadius: `calc(${cornerRadius} - ${borderThickness})`,
        }}
        className="  bg-white p-6"
      >
        {children}
      </div>
    </div>
  );
};
