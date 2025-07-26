import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/user')({
  component: User,
});

function User() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">User Management</h2>
      <div className="rounded bg-blue-50 p-4">
        <p>This is the user section. Nested routes will render below:</p>
        <Outlet />
      </div>
    </div>
  );
}
