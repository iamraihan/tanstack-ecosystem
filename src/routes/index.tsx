import { createFileRoute } from '@tanstack/react-router';

import { ProductList } from '@/components/features';

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({
    limit: Number(search.limit) || 30,
    skip: Number(search.skip) || 0,
  }),
  component: Index,
});

export function Index() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <ProductList />
    </div>
  );
}
