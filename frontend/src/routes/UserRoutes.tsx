import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Loadable from "../third-party/Loadable";
import UserLayout from "../components/FullLayout/user/UserLayout";

const DashboardPage = Loadable(lazy(() => import("../page/User/Dashboard")));
const TransactionList = Loadable(lazy(() => import("../page/User/TransactionList.tsx")));
const TransactionFormPage = Loadable(lazy(() => import("../page/User/TransactionForm/TransactionFormPage")));
const CategoryManager = Loadable(lazy(() => import("../page/User/CategoryManager")));


const UserRoutes = (): RouteObject => {
  return {
    path: "/user",
    element: <UserLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "transactions", element: <TransactionList /> },
      { path: "transactions/new", element: <TransactionFormPage /> },
      { path: "categories", element: <CategoryManager /> },
    ],
  };
};

export default UserRoutes;