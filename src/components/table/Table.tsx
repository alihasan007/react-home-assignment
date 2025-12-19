import React from "react";

type Column<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
};

export default function Table<T>({ data, columns, onRowClick }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.header}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 border-b"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              className="border-b last:border-b-0 hover:bg-slate-50 cursor-pointer"
            >
              {columns.map((c) => (
                <td key={c.header} className="px-4 py-3 text-sm text-slate-700">
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
