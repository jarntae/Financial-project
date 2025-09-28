import { lazy } from "react";
import Loadable from "../third-party/Loadable";
import type { RouteObject } from "react-router-dom";
const HomePage = Loadable(lazy(() => import("../page/home")));


const MainRoutes = (): RouteObject => {
  return {
    path: "/",
    element: <HomePage />, 
  };
};

export default MainRoutes;
