import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { createElement } from "react";

const { Header, Sider, Content } = Layout;

export const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  return (
    <Layout style={{ width: "100vw", minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo flex-center">
          <h3 style={{ color: "white" }}>Service Centre</h3>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Quick Find Item
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Employee Management
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
