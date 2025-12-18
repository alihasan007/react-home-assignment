import React from "react";

export default function ChartWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="card">{children}</div>;
}
