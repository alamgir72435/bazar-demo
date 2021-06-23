import React, { useState, useEffect } from "react";
import { Card, Input, Form, Button, message } from "antd";
import { authenticate } from "./../api/user";
import { useMutation } from "react-query";
const Login = ({ history, setLoggedIn }) => {
	const [state, setState] = useState({
		username: "",
		password: "",
	});

	const checkLogin = () => {
		const token = localStorage.getItem("token");
		if (!token == null) {
			// lets have refresh token
		}
	};

	useEffect(() => {
		checkLogin();
	}, []);

	const { mutate: authAction, isLoading: processing } = useMutation(
		authenticate,
		{
			onSuccess: ({ token, user }) => {
				localStorage.setItem("token", token);
				message.success("login success");
				setLoggedIn(true);
			},
			onError: (err) => {
				message.error(err?.response?.data?.message);
			},
		}
	);

	const authActionHandler = () => {
		authAction(state);
	};

	return (
		<div style={style.main}>
			<div
				style={{
					marginTop: -100,
					width: "400px",
					height: "400px",
					// backgroundColor: "#ddd",
				}}
			>
				<Card>
					<h2 style={{ textAlign: "center" }}>Admin Login</h2>
					<Form layout="vertical">
						<Form.Item label="username">
							<Input
								placeholder="username"
								value={state.username}
								onChange={(e) =>
									setState((p) => ({ ...p, username: e.target.value }))
								}
							/>
						</Form.Item>
						<Form.Item label="password">
							<Input
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										authActionHandler();
									}
								}}
								type="password"
								placeholder="password"
								value={state.password}
								onChange={(e) =>
									setState((p) => ({ ...p, password: e.target.value }))
								}
							/>
						</Form.Item>
						<Form.Item>
							<Button loading={processing} onClick={authActionHandler}>
								Login
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
};

const style = {
	main: {
		width: "100%",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
};
export default Login;
