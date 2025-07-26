import { useNavigate } from '@tanstack/react-router';

// interface DataTablePaginationProps<T> {
//   data: { items: T[]; total: number } | undefined;
//   isLoading: boolean;
// }

const DataTablePagination = () => {
  // const navigate = useNavigate();
  // const search = useSearch({ from: "/" });

  // // states

  // // Calculate pagination from search params
  // const pageIndex = Math.floor(search.skip / search.limit);

  // const pageSize = search.limit;

  // states

  // Navigation functions
  // const goToPage = (newPageIndex: number) => {
  //   const newSkip = newPageIndex * pageSize;
  //   console.log(
  //     "Navigating to page:",
  //     newPageIndex,
  //     "skip:",
  //     newSkip,
  //     "limit:",
  //     pageSize
  //   );
  //   navigate({
  //     to: "/",
  //     search: {
  //       limit: pageSize,
  //       skip: newSkip,
  //     },
  //     replace: true,
  //   });
  // };

  // const changePageSize = (newPageSize: number) => {
  //   navigate({
  //     to: "/",
  //     search: {
  //       limit: newPageSize,
  //       skip: 0, // Reset to first page when changing page size
  //     },
  //     replace: true,
  //   });
  // };
  const navigate = useNavigate();

  const nextPageHandler = () => {
    console.log('nextPageHandler');
    navigate({
      to: '/',
      search: { limit: 30, skip: 0 },
    });
  };
  const prevPageHandler = () => {
    console.log('prevPageHandler');
  };
  return (
    <>
      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="rounded border px-3 py-1 disabled:opacity-50"
            onClick={() => prevPageHandler()}
            // disabled={pageIndex === 0}
          >
            Previous
          </button>
          <button
            className="rounded border px-3 py-1 disabled:opacity-50"
            onClick={() => nextPageHandler()}
            // disabled={
            //   pageIndex >=
            //   (products ? Math.ceil(products.total / pageSize) - 1 : 0)
            // }
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
