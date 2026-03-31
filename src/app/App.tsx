import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { LoginModal } from './components/LoginModal';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Dashboard } from './pages/Dashboard';
import { Cart } from './pages/Cart';
import { Orders } from './pages/Orders';
import { Finance } from './pages/Finance';

// A wrapper that reads context to block unauthenticated routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAppContext();
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Root provider component
const Root = () => {
  return (
    <AppProvider>
      <Layout />
      <LoginModal />
    </AppProvider>
  );
};

// Define routes using the recommended Data mode
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Catalog },
      { path: "product/:id", Component: Product },
      { path: "dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "finance", element: <ProtectedRoute><Finance /></ProtectedRoute> },
      { path: "deliveries", element: <ProtectedRoute><div className="flex items-center justify-center h-64 text-gray-500">Delivery tracking system coming soon.</div></ProtectedRoute> },
      { path: "*", element: <div className="flex items-center justify-center h-64 text-gray-500">Page not found</div> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
