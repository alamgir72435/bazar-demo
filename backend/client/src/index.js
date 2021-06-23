import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

ReactDOM.render(
	<QueryClientProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>{" "}
	</QueryClientProvider>,
	document.getElementById("root")
);
