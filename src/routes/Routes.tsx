import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import Search from "../pages/Search";
import Settings from "../pages/Settings";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, path: "/", element: <Home /> },
        { path: "search/:query", element: <Search /> },
        { path: "/settings", element: <Settings /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}
