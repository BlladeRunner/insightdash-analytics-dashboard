import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usd } from "../../utils/format";

export default function EventsTable({ rows }) {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "date", header: "Date" },
      {
        accessorKey: "channel",
        header: "Channel",
        cell: (info) => (
          <span className="uppercase text-xs text-slate-700 dark:text-slate-300">
            {info.getValue()}
          </span>
        ),
      },
      { accessorKey: "event", header: "Event" },
      {
        accessorKey: "revenue",
        header: "Revenue",
        cell: (info) => (
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {usd(info.getValue())}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Events
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Sortable table
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Rows:{" "}
          <span className="text-slate-900 dark:text-slate-200">
            {rows.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-950/60">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-t border-slate-200 dark:border-slate-800">
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={[
                        "px-4 py-3 text-left text-xs font-semibold",
                        "text-slate-600 border-b border-slate-200",
                        "dark:text-slate-300 dark:border-slate-800",
                        canSort ? "cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-100" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {sortDir === "asc" && (
                          <span className="text-slate-400 dark:text-slate-500">↑</span>
                        )}
                        {sortDir === "desc" && (
                          <span className="text-slate-400 dark:text-slate-500">↓</span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={[
                  "border-b border-slate-200",
                  "hover:bg-slate-50 transition",
                  "dark:border-slate-800/70 dark:hover:bg-slate-950/30",
                ].join(" ")}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-sm text-slate-800 dark:text-slate-200"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}