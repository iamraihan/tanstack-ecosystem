import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>This is the dashboard layout. Nested routes will render below:</p>
        <Outlet />
      </div>
    </div>
  );
}
