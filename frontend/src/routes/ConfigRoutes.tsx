import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";

import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import MainRoutes from "./MainRoutes";


function ConfigRoutes() {
    const isLoggedIn = localStorage.getItem("isLogin") === "true";
    const role = localStorage.getItem("role");

    let routes: RouteObject[] = [];

    if (isLoggedIn && role === "admin") {
        routes = [AdminRoutes(), MainRoutes()];
    } else if (isLoggedIn && role === "user") {
        routes = [UserRoutes(), MainRoutes()];
    } else {
        routes = [MainRoutes()];
    }

    return useRoutes(routes);

}

export default ConfigRoutes;