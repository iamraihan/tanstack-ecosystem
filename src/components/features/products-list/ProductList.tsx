import { useState } from 'react';

import { useSearch } from '@tanstack/react-router';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { AppDataTable } from '@/components/ui';
import { useGetProducts } from '@/services';
import type { Product } from '@/types';

const ProductsList = () => {
  const [rowSelection, setRowSelection] = useState({});

  // get the search params
  const search = useSearch({ from: '/' });

  const { data: { products, total } = {}, isLoading } = useGetProducts({
    limit: Number(search.limit) || 30,
    skip: Number(search.skip) || 0,
  });

  const columnHelper = createColumnHelper<Product>();

  const productColumns = [
    columnHelper.accessor('title', {
      header: ({ table }) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4"
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
            className="h-4 w-4"
          />
          <img
            src={info.row.original.thumbnail}
            alt={info.getValue()}
            className="h-10 w-10 rounded object-cover"
          />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('price', {
      header: 'Price',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) =>
        info.getValue().length > 100
          ? info.getValue().substring(0, 100) + '...'
          : info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button
          className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:underline"
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
    manualPagination: true,
    pageCount: total,
  });
  return (
    <div className="mx-auto max-w-5xl p-4">
      <AppDataTable<Product> table={table} isLoading={isLoading} />
    </div>
  );
};

export default ProductsList;
