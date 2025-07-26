import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">
                  TanStack App
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 [&.active]:bg-gray-900 [&.active]:text-white"
                  >
                    Products
                  </Link>
                  <Link
                    to="/about"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 [&.active]:bg-gray-900 [&.active]:text-white"
                  >
                    About
                  </Link>
                  <Link
                    to="/dashboard"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 [&.active]:bg-gray-900 [&.active]:text-white"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>

      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </>
  ),
});
