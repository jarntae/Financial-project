import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";
import { useAuth } from "../../../services/https/useAuth";
import SidebarAdmin from "../../Sidebar/Admin/sidebar";
import Topbar from "../../Topber/Topbar";

const { Header, Content } = Layout;

const AdminLayout: React.FC = () => {
  const { user, loading, isLogin } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isLogin || user?.role !== "admin") return <Navigate to="/" replace />;
  console.log("AdminLayout -> user", user);
  console.log("AdminLayout -> isLogin", isLogin);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-primary)",
        fontFamily: "var(--font-Kanit)",
      }}
    >
      <Header style={{ padding: 0, height: 120, background: "var(--color-a3)" }}>
        <Topbar />
      </Header>
      <Layout hasSider className="flex-1 min-h-0 flex">
        <SidebarAdmin />
        <Content className="min-h-0" style={{ marginTop: "0px" }}>
          <Breadcrumb />
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
