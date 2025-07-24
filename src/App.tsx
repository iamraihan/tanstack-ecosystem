import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { API_URL } from "./constants";
import type { Product } from "./types";
import { AppDataTable } from "./helpers/ui";

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

  console.log(table.getCoreRowModel(), "table");
  return (
    <div className="max-w-7xl mx-auto p-4">
      <AppDataTable<Product> table={table} />
    </div>
  );
}

export default App;
