import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { API_URL } from "./constants";
import type { Product } from "./types";

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.products;
};

function App() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const columnHelper = createColumnHelper<Product>();

  const productColumns = [
    columnHelper.accessor("title", {
      header: "Name",
      cell: (info) => info.getValue(),
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
  });

  console.log(table, "table");
  return (
    <div className="max-w-7xl mx-auto p-4">
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
    </div>
  );
}

export default App;
