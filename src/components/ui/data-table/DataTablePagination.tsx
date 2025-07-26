import { useSearch } from '@tanstack/react-router';

import { usePagination } from '@/components/hooks';

interface DataTablePaginationProps {
  total: number;
}

const DataTablePagination = ({ total }: DataTablePaginationProps) => {
  const search = useSearch({ from: '/' });
  const { navigateToPage } = usePagination();
  // Current page index and page size
  // Validate that search.skip and search.limit are numbers and limit is not zero to avoid NaN/Infinity
  const skip = Number(search.skip) || 0;
  const limit = Number(search.limit) || 1; // fallback to 1 to avoid division by zero
  const pageIndex = limit > 0 ? Math.floor(skip / limit) : 0;

  return (
    <>
      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => navigateToPage({ pageIndex: pageIndex - 1 })}
            disabled={pageIndex <= 0}
          >
            Previous
          </button>
          <button
            className="cursor-pointer rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => navigateToPage({ pageIndex: pageIndex + 1 })}
            disabled={pageIndex >= Math.ceil(total / search.limit) - 1}
          >
            Next
          </button>
        </div>

        {/* <div className="flex items-center gap-2">
          <span className="text-sm">
            Page {pageIndex + 1} of{" "}
            {data ? Math.ceil(data.total / pageSize) : 0}
          </span>
          <span className="text-sm text-gray-600">
            Showing {data?.items.length || 0} of {data?.total || 0} results
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
        </div> */}
      </div>
    </>
  );
};

export default DataTablePagination;
