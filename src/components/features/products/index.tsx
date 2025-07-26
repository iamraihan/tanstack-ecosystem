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

  const { data } = useGetProducts({
    limit: Number(search.limit) || 30,
    skip: Number(search.skip) || 0,
  });

  const products = data?.products || [];
  const total = data?.total || 0;

  console.log(total, 'total');

  const columnHelper = createColumnHelper<Product>();

  const productColumns = [
    columnHelper.accessor('title', {
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
      cell: info => (
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
    columnHelper.accessor('price', {
      header: 'Price',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: info =>
        info.getValue().length > 100
          ? info.getValue().substring(0, 100) + '...'
          : info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
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
    manualPagination: true,
    // pageCount: products ? Math.ceil(products.total / pageSize) : 0,
  });
  return (
    <div className="max-w-5xl mx-auto p-4">
      <AppDataTable<Product> table={table} />
    </div>
  );
};

export default ProductsList;
