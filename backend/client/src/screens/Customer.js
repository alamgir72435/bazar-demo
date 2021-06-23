import React from "react";
import { Table, Row, Col, Card, PageHeader, Button } from "antd";
import { useQuery } from "react-query";
import { fetchCustomers } from "../api/customer";

const Customer = ({ history }) => {
	const { data: customers, isLoading: fetching } = useQuery(
		"customers",
		fetchCustomers
	);

	const columns = [
		{
			title: "Serial",
			dataIndex: "_id",
			key: "_id",
			render: (a, b, c) => <>{c + 1}</>,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},

		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
	];

	return (
		<>
			<Row>
				<Col xs={24} md={24} sm={24} lg={24}>
					<PageHeader
						className="pageHeader"
						onBack={() => history.goBack()}
						title="Customer list"
						extra={[
							<Button onClick={() => history.goBack()} key="1">
								Back
							</Button>,
						]}
					/>
				</Col>
				<Col xs={24} md={24} sm={24} lg={24}>
					<Card>
						<Table
							size="small"
							rowKey="_id"
							loading={fetching}
							dataSource={customers}
							columns={columns}
						/>
						;
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Customer;
