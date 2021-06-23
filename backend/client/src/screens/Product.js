import React from "react";
import {
	Table,
	Row,
	Col,
	Card,
	PageHeader,
	Button,
	Avatar,
	message,
	Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	fetchProduct,
	disableProduct,
	enableProduct,
	deleteProduct,
} from "./../api/product";
import {
	DeleteOutlined,
	StopOutlined,
	CheckSquareOutlined,
	EditOutlined,
} from "@ant-design/icons";

const Product = ({ history }) => {
	const queryclient = useQueryClient();
	const { data: products, isLoading: fetching } = useQuery(
		"products",
		fetchProduct
	);

	const { mutate: disableProductAction } = useMutation(disableProduct, {
		onSuccess: () => {
			message.success("Disabled");
			queryclient.invalidateQueries("products");
		},
		onError: (err) => {
			message.error(err.response.data.message);
		},
	});

	const { mutate: enableProductAction } = useMutation(enableProduct, {
		onSuccess: () => {
			message.success("Enabled");
			queryclient.invalidateQueries("products");
		},
		onError: (err) => {
			message.error(err.response.data.message);
		},
	});

	const { mutate: deleteProductAction } = useMutation(deleteProduct, {
		onSuccess: () => {
			message.success("Deleted");
			queryclient.invalidateQueries("products");
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
			title: "Product Name",
			dataIndex: "title",
			key: "title",
		},

		{
			title: "Unit",
			dataIndex: "unit",
			key: "unit",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Image",
			dataIndex: "image",
			key: "image",
			render: (image) => (
				<>
					<Avatar shape="square" src={image} />
				</>
			),
		},
		{
			title: "Action",
			dataIndex: "_id",
			key: "_id",
			render: (id, data) => (
				<>
					{!data?.disabled && (
						<Button
							onClick={() => disableProductAction({ id })}
							icon={<StopOutlined />}
						></Button>
					)}
					{data?.disabled && (
						<Button
							onClick={() => enableProductAction({ id })}
							icon={<CheckSquareOutlined />}
						></Button>
					)}
					<Button
						onClick={() => history.push(`/product/edit/${id}`)}
						icon={<EditOutlined />}
					></Button>

					<Popconfirm
						title="Are you sure to Parmanently Delete?"
						onConfirm={() => deleteProductAction({ id })}
					>
						<Button icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<Row>
			<Col xs={24} md={24} sm={24} lg={24}>
				<PageHeader
					className="pageHeader"
					onBack={() => history.goBack()}
					title="Product"
					extra={[
						<Link key="1" to="/product-add">
							<Button>Add Product</Button>
						</Link>,
					]}
				/>
			</Col>
			<Col xs={24} md={24} sm={24} lg={24}>
				<Card>
					<Table
						size="small"
						rowKey="_id"
						loading={fetching}
						dataSource={products}
						columns={columns}
					/>
					;
				</Card>
			</Col>
		</Row>
	);
};

export default Product;
