import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/auth/Login";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/login", element: <Login /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}
