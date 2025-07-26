# React Project Structure Template

A comprehensive React project structure template that can be used for any React application (Vite, Next.js, Create React App, etc.) following modern best practices and conventions.

## 🎯 **Universal React Project Template**

This structure works for:

- ✅ **Vite + React** (current project)
- ✅ **Next.js** (with minor adjustments)
- ✅ **Create React App**
- ✅ **Remix**
- ✅ **Gatsby**
- ✅ **Any React-based framework**

## 🏗️ Project Structure & Hierarchy

```
src/
├── components/          # UI Components
│   ├── ui/             # Base UI components (reusable)
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── data-table/
│   │   │   ├── AppDataTable.tsx
│   │   │   ├── DataTablePagination.tsx
│   │   │   └── index.ts
│   │   ├── input/
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   └── index.ts    # Main UI exports
│   ├── features/       # Feature-specific components
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── index.ts
│   │   ├── users/
│   │   │   ├── UserProfile.tsx
│   │   │   └── index.ts
│   │   └── dashboard/
│   │       ├── DashboardStats.tsx
│   │       └── index.ts
│   ├── layout/         # Layout components (root level)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navigation.tsx
│   │   └── index.ts
│   ├── common/         # Common app-wide components
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── index.ts
│   └── index.ts        # Main components export
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── usePagination.ts
│   └── index.ts
├── services/           # API services
│   ├── products.ts
│   ├── users.ts
│   └── index.ts
├── lib/               # Third-party configs
│   ├── api.ts         # Axios config
│   └── utils.ts       # Library utilities
├── types/             # TypeScript types
│   ├── common.ts
│   ├── api.ts
│   └── index.ts
├── utils/             # Helper functions
│   ├── format.ts      # Formatting utilities
│   ├── validation.ts  # Validation helpers
│   ├── constants.ts   # App constants
│   └── index.ts
├── constants/         # App constants
│   ├── api.ts
│   ├── routes.ts
│   └── index.ts
├── providers/         # React providers
│   ├── AppProviders.tsx
│   ├── ThemeProvider.tsx
│   └── index.ts
├── routes/            # Route components
│   ├── __root.tsx
│   ├── index.tsx
│   ├── about.tsx
│   ├── dashboard.tsx
│   └── dashboard.user.tsx
└── assets/            # Static assets
    ├── images/
    ├── icons/
    └── styles/
```

```

## 📁 Detailed Folder & File Use Cases

### 🧩 **Components Directory (`src/components/`)**

#### **UI Components (`src/components/ui/`)**

**Purpose**: Reusable, generic UI components that can be used across the entire application.

**Structure**:

```

ui/
├── button/
│ ├── Button.tsx # Reusable button component with variants
│ └── index.ts # Export button component
├── data-table/
│ ├── AppDataTable.tsx # Generic data table wrapper
│ ├── DataTablePagination.tsx # Pagination controls
│ └── index.ts # Export table components
├── input/
│ ├── Input.tsx # Reusable input component
│ └── index.ts # Export input component
└── index.ts # Main UI exports

````

**Use Cases**:

- **Button.tsx**: Primary, secondary, outline button variants
- **AppDataTable.tsx**: Generic table wrapper for any data type
- **DataTablePagination.tsx**: Reusable pagination controls
- **Input.tsx**: Text, email, password input fields

**UI Component Examples**:

```typescript
// src/components/ui/button/Button.tsx
import React from 'react';
import { cn } from '@/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && <Spinner className="mr-2 h-4 w-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// src/components/ui/input/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// src/components/ui/index.ts
export { Button } from './button/Button';
export { Input } from './input/Input';
export { AppDataTable } from './data-table/AppDataTable';
export { DataTablePagination } from './data-table/DataTablePagination';
```

#### **Layout Components (`src/components/layout/`)**
**Purpose**: Layout components that define the overall structure of the application (header, footer, sidebar, navigation).

**Structure**:
```
layout/
├── Header.tsx          # Main application header
├── Footer.tsx          # Main application footer
├── Sidebar.tsx         # Sidebar navigation
├── Navigation.tsx      # Main navigation component
└── index.ts           # Export layout components
```

**Use Cases**:
- **Header.tsx**: Logo, main navigation, user menu, search bar
- **Footer.tsx**: Links, copyright, social media icons
- **Sidebar.tsx**: Collapsible sidebar with navigation items
- **Navigation.tsx**: Main navigation menu with active states

**Layout Component Examples**:
```typescript
// src/components/layout/Header.tsx
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            <nav className="ml-10 space-x-8">
              <a href="/" className="text-gray-900 hover:text-gray-500">Home</a>
              <a href="/products" className="text-gray-900 hover:text-gray-500">Products</a>
              <a href="/about" className="text-gray-900 hover:text-gray-500">About</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.name}</span>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button variant="primary">Login</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// src/components/layout/Sidebar.tsx
import { useState } from 'react';
import { cn } from '@/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Products', href: '/products', icon: '📦' },
    { label: 'Users', href: '/users', icon: '👥' },
    { label: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose} className="lg:hidden">✕</button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
```

#### **Common Components (`src/components/common/`)**
**Purpose**: App-wide components that are used across multiple features but are not basic UI components.

**Structure**:
```
common/
├── LoadingSpinner.tsx   # Loading indicator
├── ErrorBoundary.tsx    # Error boundary component
├── Modal.tsx           # Modal/dialog component
├── Toast.tsx           # Toast notification
├── Breadcrumbs.tsx     # Breadcrumb navigation
└── index.ts           # Export common components
```

**Use Cases**:
- **LoadingSpinner.tsx**: Loading states throughout the app
- **ErrorBoundary.tsx**: Catch and handle React errors
- **Modal.tsx**: Reusable modal dialogs
- **Toast.tsx**: Success/error notifications
- **Breadcrumbs.tsx**: Navigation breadcrumbs

**Common Component Examples**:
```typescript
// src/components/common/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={cn('flex justify-center items-center', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
        sizeClasses[size]
      )} />
    </div>
  );
};

// src/components/common/Modal.tsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={cn(
        'bg-white rounded-lg shadow-xl w-full mx-4',
        sizeClasses[size]
      )}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

// src/components/common/Toast.tsx
import { useState, useEffect } from 'react';
import { cn } from '@/utils';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, type, duration = 5000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={cn(
      'fixed top-4 right-4 z-50 transition-all duration-300',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    )}>
      <div className={cn(
        'flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg',
        typeClasses[type]
      )}>
        <span>{icons[type]}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 hover:opacity-70"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
````

// src/components/index.ts - Main components export
export { Header, Footer, Sidebar, Navigation } from './layout';
export { LoadingSpinner, ErrorBoundary, Modal, Toast, Breadcrumbs } from './common';
export { Button, Input, AppDataTable, DataTablePagination } from './ui';

#### **Feature Components (`src/components/features/`)**

**Purpose**: Feature-specific components that contain business logic and are tied to specific features.

**Structure**:

```

features/
├── products/
│ ├── ProductCard.tsx # Individual product display card
│ ├── ProductList.tsx # Product listing with table
│ ├── ProductFilters.tsx # Product filtering controls
│ └── index.ts # Export product components
├── users/
│ ├── UserProfile.tsx # User profile display
│ └── index.ts # Export user components
└── dashboard/
├── DashboardStats.tsx # Dashboard statistics
└── index.ts # Export dashboard components

```

**Use Cases**:

- **ProductCard.tsx**: Displays individual product with image, title, price
- **ProductList.tsx**: Main product listing with TanStack Table integration
- **ProductFilters.tsx**: Search, category, price range filters
- **UserProfile.tsx**: User information display and editing
- **DashboardStats.tsx**: Statistics cards and charts

### 🪝 **Hooks Directory (`src/hooks/`)**

**Purpose**: Custom React hooks that encapsulate reusable logic and state management.

**Files**:

- **useLocalStorage.ts**: Hook for managing localStorage with React state
- **useDebounce.ts**: Hook for debouncing values (useful for search)
- **usePagination.ts**: Hook for managing pagination state and logic
- **index.ts**: Export all custom hooks

**Use Cases**:

```typescript
// useLocalStorage.ts - Persist user preferences
const [theme, setTheme] = useLocalStorage("theme", "light");

// useDebounce.ts - Debounce search input
const debouncedSearch = useDebounce(searchTerm, 300);

// usePagination.ts - Manage pagination state
const { currentPage, totalPages, nextPage, prevPage } = usePagination({
  totalItems: 100,
  pageSize: 30,
});
```

### 🔌 **Services Directory (`src/services/`)**

**Purpose**: API service layer that handles all external data fetching and mutations.

**Files**:

- **products.ts**: Product-related API calls and React Query hooks
- **users.ts**: User-related API calls and React Query hooks
- **index.ts**: Export all services and hooks

**Use Cases**:

```typescript
// products.ts - Product API service
export const productsService = {
  getProducts: async (params) => { /* API call */ },
  getProduct: async (id) => { /* API call */ },
  createProduct: async (data) => { /* API call */ }
};

// React Query hooks
export const useGetProducts = (params) => useQuery({...});
export const useCreateProduct = () => useMutation({...});
```

### 📚 **Lib Directory (`src/lib/`)**

**Purpose**: Third-party library configurations and utilities.

**Files**:

- **api.ts**: Axios instance configuration with interceptors
- **utils.ts**: Library-specific utility functions

**Use Cases**:

```typescript
// api.ts - Centralized API configuration
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// utils.ts - API helper functions
export const handleApiError = (error) => {
  /* Error handling */
};
export const createQueryKey = (baseKey, params) => {
  /* Query key creation */
};
```

### 🏷️ **Types Directory (`src/types/`)**

**Purpose**: TypeScript type definitions and interfaces.

**Files**:

- **common.ts**: Common types used across the application
- **api.ts**: API-related types and interfaces
- **index.ts**: Export all types

**Use Cases**:

```typescript
// common.ts - Common types
export interface User {
  id: number;
  name: string;
  email: string;
}

// api.ts - API types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

### 🛠️ **Utils Directory (`src/utils/`)**

**Purpose**: Pure utility functions for formatting, validation, and other helper operations.

**Files**:

- **format.ts**: Data formatting utilities
- **validation.ts**: Form and data validation functions
- **constants.ts**: Application constants
- **index.ts**: Export all utilities

**Use Cases**:

```typescript
// format.ts - Data formatting utilities
export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// validation.ts - Data validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: any): boolean => {
  return value !== null && value !== undefined && value !== "";
};

// constants.ts - Application constants
export const PAGINATION_SIZES = [10, 20, 30, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 30;

export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  USERS: "/users",
  AUTH: "/auth",
  UPLOAD: "/upload",
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  WEAK_PASSWORD:
    "Password must be at least 8 characters with uppercase, lowercase, and number",
  INVALID_PHONE: "Please enter a valid phone number",
} as const;

// Helper function usage examples
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
```

### 📋 **Constants Directory (`src/constants/`)**

**Purpose**: Application-wide constants and configuration values.

**Files**:

- **api.ts**: API-related constants
- **routes.ts**: Route-related constants
- **index.ts**: Export all constants

**Use Cases**:

```typescript
// api.ts - API constants
export const API_URL = "https://api.example.com";
export const API_TIMEOUT = 10000;

// routes.ts - Route constants
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  USERS: "/users",
};
```

### 🎭 **Providers Directory (`src/providers/`)**

**Purpose**: React context providers for global state and configuration.

**Files**:

- **AppProviders.tsx**: Main provider wrapper
- **ThemeProvider.tsx**: Theme context provider
- **index.ts**: Export all providers

**Use Cases**:

```typescript
// AppProviders.tsx - Main provider wrapper
export const AppProviders = ({ children }) => (
  <QueryClient>
    <ThemeProvider>
      <RouterProvider>{children}</RouterProvider>
    </ThemeProvider>
  </QueryClient>
);

// ThemeProvider.tsx - Theme management
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 🛣️ **Routes Directory (`src/routes/`)**

**Purpose**: TanStack Router route definitions and components.

**Files**:

- **\_\_root.tsx**: Root route layout
- **index.tsx**: Home page route
- **about.tsx**: About page route
- **dashboard.tsx**: Dashboard route
- **dashboard.user.tsx**: User dashboard route

**Use Cases**:

```typescript
// __root.tsx - Root layout
export const Route = createRootRoute({
  component: RootComponent,
});

// index.tsx - Home page
export const Route = createFileRoute("/")({
  validateSearch: (search) => ({
    limit: Number(search.limit) || 30,
    skip: Number(search.skip) || 0,
  }),
  component: Index,
});
```

### 🎨 **Assets Directory (`src/assets/`)**

**Purpose**: Static assets like images, icons, and other media files.

**Structure**:

```
assets/
├── images/     # Image files (PNG, JPG, SVG)
├── icons/      # Icon files (SVG, ICO)
└── styles/     # Global styles (if any)
```

## 🔄 **Data Flow Architecture**

```
User Interaction → Component → Custom Hook → Service → API → Response → State Update → UI Re-render
```

### **Example Flow**:

1. **User clicks pagination** → `ProductList` component
2. **Component calls** → `useGetProducts` hook
3. **Hook calls** → `productsService.getProducts`
4. **Service makes** → API request via `api.get`
5. **API returns** → Response data
6. **React Query updates** → Cache and state
7. **Component re-renders** → With new data

## 🎯 **Best Practices Followed**

### **1. Separation of Concerns**

- **Components**: UI and user interaction
- **Hooks**: Logic and state management
- **Services**: Data fetching and API communication
- **Utils**: Pure functions and helpers

### **2. Type Safety**

- TypeScript throughout the application
- Proper interfaces and types
- Generic components where appropriate

### **3. Reusability**

- Generic UI components
- Custom hooks for common patterns
- Utility functions for repeated operations

### **4. Maintainability**

- Clear folder structure
- Consistent naming conventions
- Modular architecture

### **5. Performance**

- React Query for caching and optimization
- Debounced search inputs
- Memoized components where needed

## 🚀 **Getting Started**

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development with auto-barrel** (recommended):

   ```bash
   pnpm dev:watch
   ```

   **This starts both the dev server AND auto-barrel system!** 🚀

3. **Or start without auto-barrel**:

   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   ```

**💡 Pro Tip**: Use `pnpm dev:watch` for the best development experience - barrel files are automatically generated and updated as you work!

## 🔧 **Auto Barrel Exports**

This project includes **automatic barrel file generation** that creates `index.ts` files automatically when you create new folders and files. **No manual work required!**

### **🚀 Quick Start - Just Run:**

```bash
pnpm dev:watch
```

This command starts both the development server AND the auto-barrel system. Now you can:

- ✅ Create new files → barrel files auto-generated
- ✅ Delete files → barrel files auto-updated
- ✅ Clean imports everywhere automatically

### **How it works:**

- **🔄 Fully Automatic**: Creates `index.ts` files automatically when you create new components, services, hooks, etc.
- **📁 Recursive**: Generates barrels for all subdirectories
- **🧠 Smart**: Detects both default and named exports
- **⚡ Real-time**: Watches for file changes and updates barrels instantly
- **🔄 Parent Updates**: Automatically updates parent directory barrel files when files are created/removed

### **Usage Options:**

```bash
# Recommended: Start dev server with auto-barrel
pnpm dev:watch

# Alternative: Run auto-barrel manually (if needed)
pnpm auto-barrel
```

### **What gets generated:**

When you create a file like `src/components/ui/button/Button.tsx`:

```typescript
// src/components/ui/button/index.ts (auto-generated)
export { default as Button } from "./Button";
export { Button } from "./Button";

// src/components/ui/index.ts (auto-updated)
export * from "./button";
export * from "./data-table";
export * from "./input";
// ... other exports
```

### **Supported directories:**

- `src/components/ui/`
- `src/components/features/`
- `src/services/`
- `src/hooks/`
- `src/utils/`
- `src/lib/`
- `src/types/`

### **🎯 Automatic Workflow (Just Run `pnpm dev:watch`):**

1. **Create a file**: `src/components/ui/modal/Modal.tsx`
2. **Auto-generates**: `src/components/ui/modal/index.ts`
3. **Auto-updates**: `src/components/ui/index.ts` to include `export * from './modal';`
4. **Clean imports**: `import { Modal } from '@/components/ui'`

**That's it! No manual work needed.** 🎉

### **File Removal:**

When you delete a file, the system automatically:

- Removes exports from the directory's `index.ts`
- Updates parent directory's `index.ts` to remove the export
- Keeps imports clean and up-to-date

### **Example:**

When you create `src/components/ui/button/Button.tsx`, the script automatically creates/updates `src/components/ui/button/index.ts` with:

```typescript
export { default as Button } from "./Button";
export { Button } from "./Button";
```

This allows clean imports: `import { Button } from '@/components/ui'`

## 📦 **Key Dependencies**

- **React**: UI library
- **TanStack Table**: Headless table library
- **TanStack Router**: Type-safe routing
- **React Query**: Data fetching and caching
- **Axios**: HTTP client
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling

## 🔧 **Configuration Files**

- **vite.config.ts**: Vite configuration
- **tsconfig.json**: TypeScript configuration
- **eslint.config.js**: ESLint configuration
- **package.json**: Dependencies and scripts

This structure ensures a scalable, maintainable, and type-safe React application following modern best practices!

## 🔄 **Framework-Specific Adaptations**

### **Next.js Adaptations**

```typescript
// For Next.js, move routes to app/ directory
app/
├── layout.tsx          # Root layout (replaces __root.tsx)
├── page.tsx           # Home page (replaces index.tsx)
├── about/
│   └── page.tsx       # About page
├── dashboard/
│   ├── page.tsx       # Dashboard page
│   └── user/
│       └── page.tsx   # User dashboard
└── globals.css        # Global styles

// Update imports for Next.js
import { Button } from '@/components/ui';
import { useGetProducts } from '@/services';
import { formatCurrency } from '@/utils';
```

### **Create React App Adaptations**

```typescript
// For CRA, use src/App.tsx instead of routes
src/
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── components/        # Same structure as above

// Use React Router instead of TanStack Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

### **Remix Adaptations**

```typescript
// For Remix, use app/ directory with .tsx files
app/
├── root.tsx           # Root layout
├── routes/
│   ├── _index.tsx     # Home page
│   ├── about.tsx      # About page
│   └── dashboard.tsx  # Dashboard page
└── components/        # Same structure as above

// Use Remix's loader and action functions
export async function loader({ request }: LoaderArgs) {
  // Data fetching
}
```

## 🛠️ **Helper Functions Usage Examples**

### **In Components**

```typescript
// src/components/features/products/ProductCard.tsx
import { formatCurrency, truncateText, cn } from "@/utils";
import { Button } from "@/components/ui";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className={cn("product-card", "hover:shadow-lg")}>
      <img src={product.image} alt={product.title} />
      <h3>{truncateText(product.title, 50)}</h3>
      <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
      <Button variant="primary" size="sm">
        Add to Cart
      </Button>
    </div>
  );
};
```

### **In Forms**

```typescript
// src/components/features/users/UserForm.tsx
import { useState } from "react";
import { Input, Button } from "@/components/ui";
import { isValidEmail, isValidPassword, ERROR_MESSAGES } from "@/utils";

export const UserForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isValidEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    if (!isValidPassword(formData.password)) {
      newErrors.password = ERROR_MESSAGES.WEAK_PASSWORD;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validateForm()) {
          // Submit form
        }
      }}
    >
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
        helperText="Must be at least 8 characters with uppercase, lowercase, and number"
      />
      <Button type="submit" variant="primary">
        Create Account
      </Button>
    </form>
  );
};
```

### **In Custom Hooks**

```typescript
// src/hooks/useSearch.ts
import { useState, useEffect } from "react";
import { debounce } from "@/utils";

export const useSearch = (initialValue = "") => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

  const debouncedSetSearch = debounce((value: string) => {
    setDebouncedSearch(value);
  }, 300);

  useEffect(() => {
    debouncedSetSearch(searchTerm);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearch,
  };
};
```

### **In Services**

```typescript
// src/services/products.ts
import { api } from "@/lib/api";
import { handleApiError, createQueryKey } from "@/lib/utils";
import { API_ENDPOINTS } from "@/utils";

export const productsService = {
  getProducts: async (params: GetProductsParams) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS, { params });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  createProduct: async (productData: CreateProductData) => {
    try {
      const response = await api.post(API_ENDPOINTS.PRODUCTS, productData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

export const useGetProducts = (params: GetProductsParams) => {
  return useQuery({
    queryKey: createQueryKey("products", params),
    queryFn: () => productsService.getProducts(params),
  });
};
```

## 📋 **Quick Reference Guide**

### **Import Patterns**

```typescript
// UI Components
import { Button, Input, AppDataTable } from "@/components/ui";

// Custom Hooks
import { useLocalStorage, useDebounce, usePagination } from "@/hooks";

// Services
import { useGetProducts, productsService } from "@/services";

// Utilities
import { formatCurrency, isValidEmail, cn } from "@/utils";

// Types
import type { Product, User } from "@/types";

// Constants
import { API_ENDPOINTS, ERROR_MESSAGES } from "@/utils";
```

### **File Naming Conventions**

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`)
- **Services**: camelCase (e.g., `products.ts`)
- **Utils**: camelCase (e.g., `format.ts`)
- **Types**: camelCase (e.g., `common.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)

### **Export Patterns**

```typescript
// Always use named exports
export { Button } from "./Button";
export type { ButtonProps } from "./Button";

// Index files for clean imports
// src/components/ui/index.ts
export { Button } from "./button/Button";
export { Input } from "./input/Input";
export { AppDataTable } from "./data-table/AppDataTable";
```

This comprehensive structure provides a solid foundation for any React project, with clear patterns for helpers, UI components, and framework adaptations!
