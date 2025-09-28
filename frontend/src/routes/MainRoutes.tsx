import { lazy } from "react";
import Loadable from "../third-party/Loadable";
import type { RouteObject } from "react-router-dom";

const HomePage = Loadable(lazy(() => import("../page/home")));
// const DashboardPage = Loadable(lazy(() => import("../page/Dashboard/index")));

const MainRoutes = (): RouteObject => {
  return {
    path: "/",
    element: <HomePage />, // หน้า homepage public
    children: [
      // // เพิ่ม public routes อื่น ๆ ถ้ามี
      // {
      //   path: "dashboard",
      //   element: <DashboardPage />,
      // },
    ],
  };
};

export default MainRoutes;
