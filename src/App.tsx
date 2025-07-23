import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
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

  console.log(products, "products");

  const table = useReactTable({
    data: products || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <div className="bg-red-500 text-white p-3">Hello World</div>;
}

export default App;
