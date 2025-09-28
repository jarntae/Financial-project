import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";

import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../Topber/Topbar";
import LoginPage from "../../../page/authentication/Login/Login";

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [checkLogin, setCheckLogin] = useState(false);
  const isLoggedIn = localStorage.getItem("isLogin") === "true";
  console.log("check-login", isLoggedIn);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const notLoginPage = location.pathname !== "/";
    setCheckLogin(isLogin && notLoginPage);
  }, [location.pathname]);

  const Role = localStorage.getItem("role") || "";
  console.log("check-Role", Role);

  if (isLoggedIn && Role == "admin") {
    return (
      <div>
        <Layout
          style={{
            minHeight: "100vh",
            backgroundColor: "var(--color-primary)",
            fontFamily: "var(--font-Kanit)",
          }}
        >
          <Topbar />
          <Layout>
            <Sidebar />
            <Content style={{ marginTop: "0px" }}>
              <Breadcrumb />
              <div>
                <Outlet /> {/* ตรงนี้จะ render หน้า child เช่น Dashboard */}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return <LoginPage />;
  }
};

export default AdminLayout;