import type React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
  const [selectedItems, setSelectedItems] = useState<
    Array<{ [key: number]: boolean }>
  >([]);
  console.log(selectedItems, "selectedItems");
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const onChangeHandler = (key: number, value: boolean) => {
    setSelectedItems((prevData) => {
      if (value === true) {
        // If checking, add the item (if not already present)
        const exists = prevData.some((item) => key in item);
        if (!exists) {
          return [...prevData, { [key]: true }];
        }
        return prevData;
      } else {
        // If unchecking, remove the item
        return prevData.filter((item) => !(key in item));
      }
    });
  };

  const columnHelper = createColumnHelper<Product>();

  const productColumns = [
    columnHelper.accessor("title", {
      header: "Name",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name={info.row.original.id.toString()}
            checked={
              selectedItems.some(
                (item) => item[info.row.original.id] === true
              ) || false
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeHandler(info.row.original.id, e.target.checked)
            }
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
  });

  return (
    <div className="max-w-5xl mx-auto p-4">
      <AppDataTable<Product> table={table} />
    </div>
  );
}

export default App;
