import { flexRender, useReactTable } from "@tanstack/react-table";
import DataTablePagination from "@/components/ui/data-table/DataTablePagination";
import { useNavigate } from "@tanstack/react-router";

interface AppDataTableProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
}

const AppDataTable = <TData,>({ table }: AppDataTableProps<TData>) => {
  const navigate = useNavigate();
  // console.log(table, "table");
  return (
    <>
      <button
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => navigate({ to: "/" })}
      >
        back to home
      </button>
      <DataTablePagination />
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
    </>
  );
};

export default AppDataTable;
