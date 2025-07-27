# Reusable Data Table Pagination

This directory contains reusable data table components with built-in pagination that can be used across different routes in your application.

## Components

### `DataTablePagination`

A flexible pagination component that can be customized for different use cases.

### `AppDataTable`

A complete data table component that includes the table and pagination controls.

## Usage Examples

### Basic Usage (Current Route)

```tsx
import { AppDataTable } from '@/components/ui';

const MyComponent = () => {
  const table = useReactTable({
    data: myData,
    columns: myColumns,
    manualPagination: true,
    pageCount: totalPages,
  });

  return <AppDataTable table={table} isLoading={isLoading} />;
};
```

### Customized Pagination

```tsx
import { AppDataTable } from '@/components/ui';

const MyComponent = () => {
  const table = useReactTable({
    data: myData,
    columns: myColumns,
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <AppDataTable
      table={table}
      isLoading={isLoading}
      showPagination={true}
      pageSizeOptions={[5, 10, 25, 50]}
      showPageSizeSelector={true}
    />
  );
};
```

### Without Pagination

```tsx
import { AppDataTable } from '@/components/ui';

const MyComponent = () => {
  const table = useReactTable({
    data: myData,
    columns: myColumns,
  });

  return (
    <AppDataTable table={table} isLoading={isLoading} showPagination={false} />
  );
};
```

## Route Setup

To use pagination on a route, make sure your route has the proper search parameter validation:

```tsx
// src/routes/my-route.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/my-route')({
  validateSearch: (search: Record<string, unknown>) => ({
    limit: Number(search.limit) || 30,
    skip: Number(search.skip) || 0,
  }),
  component: MyRouteComponent,
});
```

## Custom Pagination Hook

If you need pagination for a different route, you can create a custom hook:

```tsx
// src/hooks/useCustomPagination.ts
import { useNavigate, useSearch } from '@tanstack/react-router';

export const useCustomPagination = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/my-route' });

  const navigateToPage = ({ pageIndex, totalItems = 0 }) => {
    const totalPages = Math.ceil(totalItems / search.limit);
    if (pageIndex < 0 || pageIndex >= totalPages) return;

    navigate({
      to: '/my-route',
      search: {
        limit: Number(search.limit) > 0 ? Number(search.limit) : 10,
        skip: pageIndex * Number(search.limit),
      },
    });
  };

  const changePageSize = (newPageSize: number) => {
    navigate({
      to: '/my-route',
      search: {
        limit: newPageSize,
        skip: 0,
      },
    });
  };

  return { navigateToPage, changePageSize };
};
```

## Props Reference

### AppDataTable Props

| Prop                   | Type                               | Default                | Description                            |
| ---------------------- | ---------------------------------- | ---------------------- | -------------------------------------- |
| `table`                | `ReturnType<typeof useReactTable>` | -                      | The TanStack Table instance            |
| `isLoading`            | `boolean`                          | -                      | Loading state for the table            |
| `showPagination`       | `boolean`                          | `true`                 | Whether to show pagination controls    |
| `pageSizeOptions`      | `number[]`                         | `[10, 20, 30, 40, 50]` | Available page size options            |
| `showPageSizeSelector` | `boolean`                          | `true`                 | Whether to show the page size selector |

### DataTablePagination Props

| Prop                   | Type                               | Default                | Description                            |
| ---------------------- | ---------------------------------- | ---------------------- | -------------------------------------- |
| `table`                | `ReturnType<typeof useReactTable>` | -                      | The TanStack Table instance            |
| `pageSizeOptions`      | `number[]`                         | `[10, 20, 30, 40, 50]` | Available page size options            |
| `showPageSizeSelector` | `boolean`                          | `true`                 | Whether to show the page size selector |

## Features

- ✅ Responsive design
- ✅ Customizable page size options
- ✅ Optional page size selector
- ✅ Loading states with skeleton UI
- ✅ TypeScript support
- ✅ TanStack Router integration
- ✅ TanStack Table integration
