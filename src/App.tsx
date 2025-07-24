import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { RowSelectionState } from "@tanstack/react-table";
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
  console.log(rowSelection, "rowSelection");
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
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
  });

  return (
    <div className="max-w-5xl mx-auto p-4">
      <AppDataTable<Product> table={table} />
    </div>
  );
}

export default App;
