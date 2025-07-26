import { useSearch } from '@tanstack/react-router';

import { usePagination } from '@/components/hooks';

interface DataTablePaginationProps {
  total: number;
}

const DataTablePagination = ({ total }: DataTablePaginationProps) => {
  const search = useSearch({ from: '/' });
  const { navigateToPage } = usePagination();
  // Current page index and page size
  const pageIndex = search.skip / search.limit;

  return (
    <>
      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="rounded border px-3 py-1 disabled:opacity-50"
            onClick={() => navigateToPage({ pageIndex: pageIndex - 1 })}
            disabled={pageIndex <= 0}
          >
            Previous
          </button>
          <button
            className="rounded border px-3 py-1 disabled:opacity-50"
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
