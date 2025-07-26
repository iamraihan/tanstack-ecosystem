import { createFileRoute, Outlet } from '@tanstack/react-router';

import { DashboardDetails } from '@/components/features';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-4">
      <DashboardDetails />
      <div className="rounded bg-gray-100 p-4">
        <p>This is the dashboard layout. Nested routes will render below:</p>
        <Outlet />
      </div>
    </div>
  );
}
