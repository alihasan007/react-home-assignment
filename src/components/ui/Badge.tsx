import React from "react";

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 6,
        background: "#f1f5f9",
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}
