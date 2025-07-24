import { flexRender, useReactTable } from "@tanstack/react-table";

interface AppDataTableProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
}

const AppDataTable = <TData,>({ table }: AppDataTableProps<TData>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3 text-left border">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppDataTable;
