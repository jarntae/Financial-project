import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Loadable from "../third-party/Loadable";
import UserLayout from "../components/FullLayout/user/UserLayout";
import { Navigate } from "react-router-dom";

const DashboardPage = Loadable(lazy(() => import("../page/Dashboard/index")));


const UserRoutes = (): RouteObject => {
  const isLoggedIn = localStorage.getItem("isLogin") === "true";

  return {
    path: "/",
    element: isLoggedIn ? <UserLayout /> : <Navigate to="/" replace />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      // เพิ่ม route admin อื่น ๆ
    ],
  };
};

export default UserRoutes;
