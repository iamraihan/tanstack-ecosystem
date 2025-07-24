import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
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

const getProducts = async (
  limit: number = 30,
  skip: number = 0
): Promise<{ products: Product[]; total: number }> => {
  // Fetch all products from the API
  const response = await fetch(
    `${API_URL}/products?limit=${limit}&skip=${skip}`
  );
  const data = await response.json();
  // const allProducts = data.products;

  // Apply client-side pagination
  // const paginatedProducts = allProducts.slice(skip, skip + limit);

  return {
    products: data.products,
    total: data.products.length,
  };
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>) => ({
    limit: Number(search.limit) || 30,
    skip: Number(search.skip) || 0,
  }),
});

function Index() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/" });

  // states
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Calculate pagination from search params
  const pageIndex = Math.floor(search.skip / search.limit);

  const pageSize = search.limit;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", search.limit, search.skip],
    queryFn: () => getProducts(search.limit, search.skip),
  });

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
    data: products?.products || [],
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    manualPagination: true,
    pageCount: products ? Math.ceil(products.total / pageSize) : 0,
  });

  // Navigation functions
  const goToPage = (newPageIndex: number) => {
    const newSkip = newPageIndex * pageSize;
    console.log(
      "Navigating to page:",
      newPageIndex,
      "skip:",
      newSkip,
      "limit:",
      pageSize
    );
    navigate({
      to: "/",
      search: {
        limit: pageSize,
        skip: newSkip,
      },
      replace: true,
    });
  };

  const changePageSize = (newPageSize: number) => {
    navigate({
      to: "/",
      search: {
        limit: newPageSize,
        skip: 0, // Reset to first page when changing page size
      },
      replace: true,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <AppDataTable<Product> table={table} />

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => goToPage(pageIndex - 1)}
            // disabled={pageIndex === 0}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => goToPage(pageIndex + 1)}
            // disabled={
            //   pageIndex >=
            //   (products ? Math.ceil(products.total / pageSize) - 1 : 0)
            // }
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">
            Page {pageIndex + 1} of{" "}
            {products ? Math.ceil(products.total / pageSize) : 0}
          </span>
          <span className="text-sm text-gray-600">
            Showing {products?.products.length || 0} of {products?.total || 0}{" "}
            results
          </span>
          {isLoading && (
            <span className="text-sm text-blue-600">Loading...</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => changePageSize(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
