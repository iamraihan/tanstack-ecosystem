import { useSearch } from '@tanstack/react-router';
import type { useReactTable } from '@tanstack/react-table';

import { usePagination } from '@/components/hooks';

interface DataTablePaginationProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
}

const DataTablePagination = <TData,>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showPageSizeSelector = true,
}: DataTablePaginationProps<TData>) => {
  const search = useSearch({ from: '/' });
  const { navigateToPage, changePageSize } = usePagination();

  // Current page index and page size
  // Validate that search.skip and search.limit are numbers and limit is not zero to avoid NaN/Infinity
  const skip = Number(search.skip) || 0;
  const limit = Number(search.limit) || 10; // fallback to 10 to avoid division by zero
  const pageIndex = limit > 0 ? Math.floor(skip / limit) : 0;
  const totalRows = table.getRowCount();
  const totalPages = Math.ceil(table.getPageCount() / limit) || 1;

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
            disabled={pageIndex + 1 >= totalPages}
          >
            Next
          </button>
        </div>

        {/* Page Information */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {table.getRowModel().rows.length} of {totalRows} results
            </span>
          </div>
        </div>

        {/* Rows per page selector */}
        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTablePagination;
