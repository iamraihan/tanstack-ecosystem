import { useNavigate, useSearch } from '@tanstack/react-router';

type UsePaginationProps = {
  pageIndex: number;
  totalItems?: number;
};

export const usePagination = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/' });

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
      search: {
        limit: Number(search.limit) > 0 ? Number(search.limit) : 10,
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
