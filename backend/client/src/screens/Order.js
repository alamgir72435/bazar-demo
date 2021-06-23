import React, { useState } from "react";
import {
	Table,
	Row,
	Col,
	Card,
	PageHeader,
	Button,
	Modal,
	Avatar,
	message,
	Popconfirm,
	Tag,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchOrder, deliveredOrder } from "./../api/order";
import { OrderedListOutlined, CheckSquareOutlined } from "@ant-design/icons";

const Product = ({ history }) => {
	const queryclient = useQueryClient();
	const { data: orders, isLoading: fetching } = useQuery("orders", fetchOrder);
	const [orderDetailModal, setOrderDetailModal] = useState(false);
	const [cart, setCart] = useState(null);

	const { mutate: deliveredAction } = useMutation(deliveredOrder, {
		onSuccess: () => {
			message.success("Delivered");
			queryclient.invalidateQueries("orders");
		},
		onError: (err) => {
			message.error(err.response.data.message);
		},
	});

	const columns = [
		{
			title: "Serial",
			dataIndex: "_id",
			key: "_id",
			render: (a, b, c) => <>{c + 1}</>,
		},
		{
			title: "Order No",
			dataIndex: "order_no",
			key: "order_no",
		},
		{
			title: "Customer",
			dataIndex: "userId",
			key: "userId",
			render: (userId) => <>{userId?.name}</>,
		},
		{
			title: "Phone",
			dataIndex: "userId",
			key: "userId",
			render: (userId) => <>{userId?.phone}</>,
		},

		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
		},

		{
			title: "Cart",
			dataIndex: "products",
			key: "products",
			render: (products) => <>{products.length}</>,
		},
		{
			title: "Status",
			dataIndex: "_id",
			key: "_id",
			render: (_id, data) => (
				<>
					{data?.isDelivered ? (
						<Tag color="#81d325">Delivered</Tag>
					) : (
						<Tag>not Delivered</Tag>
					)}
				</>
			),
		},
		{
			title: "Action",
			dataIndex: "_id",
			key: "_id",
			width: "200px",
			render: (id) => (
				<>
					<Button
						onClick={() => {
							const product = orders.find((x) => x._id === id);
							setCart(product);
							setOrderDetailModal(true);
						}}
						icon={<OrderedListOutlined />}
					></Button>
					<Popconfirm
						title="Are you sure ? order is Delivered"
						onConfirm={() => {
							deliveredAction({ id });
						}}
					>
						<Button icon={<CheckSquareOutlined />}></Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<>
			<Row>
				<Col xs={24} md={24} sm={24} lg={24}>
					<PageHeader
						className="pageHeader"
						onBack={() => history.goBack()}
						title="Orders"
					/>
				</Col>
				<Col xs={24} md={24} sm={24} lg={24}>
					<Card>
						<Table
							size="small"
							rowKey="_id"
							loading={fetching}
							dataSource={orders}
							columns={columns}
						/>
					</Card>
				</Col>
			</Row>

			<Modal
				centered
				title="Product Details"
				visible={orderDetailModal}
				onOk={() => setOrderDetailModal(false)}
				onCancel={() => setOrderDetailModal(false)}
			>
				<ul className="cart-list">
					{cart?.products &&
						cart.products.map((x) => (
							<li key={x._id}>
								<span>
									<Avatar src={x.image} />
								</span>
								<span> {x.title}</span>
								<span>
									{x.quantity} X {x.salePrice}
								</span>
								<span>{parseInt(x.salePrice) * parseInt(x.quantity)}</span>
							</li>
						))}

					<li className="totalAmountOfCart" key={"0"}>
						<span></span>
						<span></span>
						<span>Total</span>
						<span>{cart?.amount}</span>
					</li>
				</ul>
				<div
					style={{ width: "100%", padding: 10, border: "1px solid #4f7921" }}
				>
					<span>Shipping Address : {cart?.userId?.address}</span>
				</div>
			</Modal>
		</>
	);
};

export default Product;
