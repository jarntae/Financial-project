import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Loadable from "../third-party/Loadable";
import AdminLayout from "../components/FullLayout/admin/AdminLayout";

const DashboardPage = Loadable(lazy(() => import("../page/Admin/Dashboard/index")));

const AdminRoutes = (): RouteObject => {


  return {
    path: "/admin",
    element: <AdminLayout /> ,
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
