import { useSearch } from '@tanstack/react-router';
import type { useReactTable } from '@tanstack/react-table';

import { usePagination } from '@/components/hooks';

interface DataTablePaginationProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
}

const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  const search = useSearch({ from: '/' });
  const { navigateToPage, changePageSize } = usePagination();
  // Current page index and page size
  // Validate that search.skip and search.limit are numbers and limit is not zero to avoid NaN/Infinity
  const skip = Number(search.skip) || 0;
  const limit = Number(search.limit) || 1; // fallback to 1 to avoid division by zero
  const pageIndex = limit > 0 ? Math.floor(skip / limit) : 0;

  return (
    <div className="mt-6 border-t pt-4">
      {/* Pagination Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => navigateToPage({ pageIndex: pageIndex - 1 })}
            disabled={pageIndex <= 0}
          >
            Previous
          </button>
          <button
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => navigateToPage({ pageIndex: pageIndex + 1 })}
            disabled={pageIndex + 1 >= Math.ceil(table.getPageCount() / limit)}
          >
            Next
          </button>
        </div>

        {/* Page Information */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              Page {pageIndex + 1} of {Math.ceil(table.getPageCount() / limit)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {table.getRowModel().rows.length} of{' '}
              {table.getPageCount() || 0} results
            </span>
          </div>
        </div>

        {/* Rows per page selector (commented out for now) */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            value={Number(search.limit)}
            onChange={(e) => changePageSize(Number(e.target.value))}
            className="rounded border px-2 py-1"
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
};

export default DataTablePagination;
