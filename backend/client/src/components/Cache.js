import React from "react";
import { useQueries } from "react-query";

import { fetchCustomers } from "./../api/customer";
import { fetchOrder } from "./../api/order";
import { fetchProduct, fetchCategory } from "./../api/product";

const Cache = () => {
	useQueries([
		{
			queryKey: "customers",
			queryFn: fetchCustomers,
		},
		{
			queryKey: "orders",
			queryFn: fetchOrder,
		},
		{
			queryKey: "products",
			queryFn: fetchProduct,
		},
		{
			queryKey: "categories",
			queryFn: fetchCategory,
		},
	]);

	return <React.Fragment></React.Fragment>;
};

export default Cache;
