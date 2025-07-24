import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/user/profile")({
  component: User,
});

function User() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">User Details</h3>
      <div className="bg-green-50 p-4 rounded">
        <p>This is the user page at /dashboard/user/profile</p>
        <div className="mt-4">
          <h4 className="font-medium">User Information:</h4>
          <ul className="list-disc list-inside mt-2">
            <li>Name: John Doe</li>
            <li>Email: john@example.com</li>
            <li>Role: Admin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
