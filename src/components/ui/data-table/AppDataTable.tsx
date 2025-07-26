import { useSearch } from '@tanstack/react-router';
import { flexRender, useReactTable } from '@tanstack/react-table';

import DataTablePagination from '@/components/ui/data-table/DataTablePagination';

interface AppDataTableProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
  isLoading: boolean;
}

const AppDataTable = <TData,>({
  table,
  isLoading,
}: AppDataTableProps<TData>) => {
  const search = useSearch({ from: '/' });
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            {isLoading ? (
              // Skeleton header
              <tr className="bg-gray-100">
                {[...Array(Number(search.limit) || 30)].map((_, i) => (
                  <th key={i} className="border p-3 text-left">
                    <div className="h-5 w-full animate-pulse rounded bg-gray-300" />
                  </th>
                ))}
              </tr>
            ) : (
              // Actual header
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-100">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="border p-3 text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))
            )}
          </thead>
          <tbody>
            {isLoading
              ? // Skeleton rows
                [...Array(Number(search.limit) || 30)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {[...Array(Number(search.limit) || 30)].map((_, j) => (
                      <td key={j} className="border p-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                      </td>
                    ))}
                  </tr>
                ))
              : // Actual data rows
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
};

export default AppDataTable;
