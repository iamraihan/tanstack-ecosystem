import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { RowSelectionState, PaginationState } from "@tanstack/react-table";
import { API_URL } from "@/constants";
import type { Product } from "@/types";
import { AppDataTable } from "@/helpers/ui";

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.products;
};

function App() {
  // states
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  console.log(products?.length, "products");
  const columnHelper = createColumnHelper<Product>();

  const productColumns = [
    columnHelper.accessor("title", {
      header: ({ table }) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="w-4 h-4"
          />
          <span>Name</span>
        </div>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={info.row.getIsSelected()}
            onChange={info.row.getToggleSelectedHandler()}
            className="w-4 h-4"
          />
          <img
            src={info.row.original.thumbnail}
            alt={info.getValue()}
            className="w-10 h-10 object-cover rounded"
          />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) =>
        info.getValue().length > 100
          ? info.getValue().substring(0, 100) + "..."
          : info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          className=" hover:underline bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() => alert(`Edit ID: ${row.original.id}`)}
        >
          Actions
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: products || [],
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
  });

  return (
    <div className="max-w-5xl mx-auto p-4">
      <AppDataTable<Product> table={table} />

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <span className="text-sm text-gray-600">
            Showing {table.getRowModel().rows.length} of {products?.length || 0}{" "}
            results
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border rounded px-2 py-1"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
