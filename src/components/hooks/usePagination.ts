import { useNavigate, useSearch } from '@tanstack/react-router';

type UsePaginationProps = {
  pageIndex: number;
  totalItems?: number;
};

export const usePagination = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/' });

  // pageIndex is the new index to go to (0-based)

  /**
   * The default value of 194 for `totalItems` is a placeholder.
   * In a real application, you should pass the actual total number of items as a prop to the pagination logic,
   * or retrieve it from a global state (such as Redux) if available.
   * This ensures that pagination works correctly according to the real dataset size.
   */
  const navigateToPage = ({
    pageIndex,
    totalItems = 194,
  }: UsePaginationProps) => {
    const totalPages = Math.ceil(totalItems / search.limit);
    if (pageIndex < 0 || pageIndex >= totalPages) {
      return;
    }

    navigate({
      to: '/',
      // Add validation to ensure limit is a valid positive number before using it
      search: {
        limit: Number(search.limit) > 0 ? Number(search.limit) : 10, // fallback to 10 if invalid
        skip:
          Number(search.limit) > 0
            ? pageIndex * Number(search.limit)
            : pageIndex * 10,
      },
    });
  };

  const changePageSize = (newPageSize: number) => {
    navigate({
      to: '/',
      search: {
        limit: newPageSize,
        skip: 0, // Reset to first page when changing page size
      },
    });
  };

  return { navigateToPage, changePageSize };
};
