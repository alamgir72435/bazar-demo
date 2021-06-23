import React from "react";
import { Layout, Menu, Button, message } from "antd";
import {
	DashboardOutlined,
	ShoppingCartOutlined,
	UsergroupAddOutlined,
	MacCommandOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import Logo from "./../../assets/logo.png";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchUtil } from "./../../api/util";

const MainLayout = ({ children, setLoggedIn }) => {
	const { Header, Content, Sider } = Layout;
	const { data: utils } = useQuery("utils", fetchUtil);
	const logoutHandler = () => {
		setLoggedIn(false);
		message.success("logout successfull");
	};

	return (
		<div>
			<Layout>
				<Header
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
					className="header"
				>
					<img
						style={{ width: 200, height: 60 }}
						src={utils?.logo ? utils.logo : Logo}
						alt=""
					/>
					<Button onClick={logoutHandler} style={{ float: "right" }}>
						Logout
					</Button>
				</Header>
				<Layout>
					<Sider width={200} className="site-layout-background">
						<Menu
							mode="inline"
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["sub1"]}
							style={{ height: "100%", borderRight: 0 }}
						>
							<Menu.Item icon={<DashboardOutlined />} key="1">
								<Link to="/">Dashboard</Link>
							</Menu.Item>
							<Menu.Item icon={<UnorderedListOutlined />} key="2">
								<Link to="/product">Product</Link>
							</Menu.Item>
							<Menu.Item icon={<ShoppingCartOutlined />} key="4">
								<Link to="/order">Order</Link>
							</Menu.Item>
							<Menu.Item icon={<UsergroupAddOutlined />} key="5">
								<Link to="/customer">Customer</Link>
							</Menu.Item>
							<Menu.Item icon={<MacCommandOutlined />} key="6">
								<Link to="/util">Utils</Link>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout style={{ padding: "0 24px 24px" }}>
						<Content
							className="site-layout-background main-content"
							style={{
								padding: 24,
								margin: 0,
								minHeight: "80vh",
								marginTop: 20,
							}}
						>
							{children}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};

export default MainLayout;
