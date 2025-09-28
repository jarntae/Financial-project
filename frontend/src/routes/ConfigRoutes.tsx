import { useRoutes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import MainRoutes from "./MainRoutes";

function ConfigRoutes() {
    const routes = [AdminRoutes(), UserRoutes(), MainRoutes()];
    return useRoutes(routes);
}

export default ConfigRoutes;