import React from "react";
import { Row, Col, Card } from "antd";
import { fetchCustomers } from "./../api/customer";
import { fetchOrder } from "./../api/order";
import { fetchProduct } from "./../api/product";
import { useQuery } from "react-query";

const Home = () => {
	const { data: products } = useQuery("products", fetchProduct);
	const { data: orders } = useQuery("orders", fetchOrder);
	const { data: customers } = useQuery("customers", fetchCustomers);
	// console.log(products);

	const [pending, setPending] = React.useState(0);

	const checkPendingOrder = (orders) => {
		if (orders !== undefined) {
			const pendingOrder = orders.filter((x) => !x.isDelivered);
			setPending(pendingOrder.length);
		}
	};
	React.useEffect(() => {
		checkPendingOrder(orders);
	}, [orders]);

	return (
		<>
			<Row gutter={[8, 8]}>
				<Col xs={24} sm={24} md={8} lg={8}>
					<Card className="dashboard-card">
						<h2>{orders && orders.length}</h2>
						<h4>Toal Order</h4>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={8} lg={8}>
					<Card className="dashboard-card">
						<h2>{customers && customers.length}</h2>
						<h4>Toal Customer</h4>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={8} lg={8}>
					<Card className="dashboard-card">
						<h2>{products && products.length}</h2>
						<h4>Toal Product</h4>
					</Card>
				</Col>
			</Row>
			<Row gutter={[8, 8]}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card className="dashboard-card">
						<h2>{pending}</h2>
						<h4>Pending order</h4>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Home;
