import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Loadable from "../third-party/Loadable";
import AdminLayout from "../components/FullLayout/admin/AdminLayout";
import { Navigate } from "react-router-dom";

const DashboardPage = Loadable(lazy(() => import("../page/Dashboard/index")));

const AdminRoutes = (): RouteObject => {
  const isLoggedIn = localStorage.getItem("isLogin") === "true";

  return {
    path: "/admin",
    element: isLoggedIn ? <AdminLayout /> : <Navigate to="/" replace />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      // เพิ่ม route admin อื่น ๆ
    ],
  };
};

export default AdminRoutes;
