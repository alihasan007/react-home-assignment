import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "default";
}

export default function Button({
  variant = "default",
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`btn ${variant === "primary" ? "primary" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
