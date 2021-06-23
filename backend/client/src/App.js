import React, { useState } from "react";
import Layout from "./components/layout/Layout";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Product from "./screens/Product";
import ProductAdd from "./screens/ProductAdd";
import Order from "./screens/Order";
import Customer from "./screens/Customer";
import Cache from "./components/Cache";
import Editproduct from "./screens/Editproduct";
import Login from "./screens/Login";
import Util from "./screens/Util";

function App() {
	const [loggedIn, setLoggedIn] = useState(true);

	return (
		<>
			{loggedIn && (
				<>
					<Cache />
					<Layout setLoggedIn={setLoggedIn}>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/product" exact component={Product} />
							<Route path="/product-add" exact component={ProductAdd} />
							<Route path="/order" exact component={Order} />
							<Route path="/customer" exact component={Customer} />
							<Route path="/util" exact component={Util} />
							<Route path="/product/edit/:id" exact component={Editproduct} />
						</Switch>
					</Layout>
				</>
			)}

			{!loggedIn && <Login setLoggedIn={setLoggedIn} />}
		</>
	);
}

export default App;
