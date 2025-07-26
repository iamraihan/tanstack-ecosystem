import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/user')({
  component: User,
});

function User() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="bg-blue-50 p-4 rounded">
        <p>This is the user section. Nested routes will render below:</p>
        <Outlet />
      </div>
    </div>
  );
}
