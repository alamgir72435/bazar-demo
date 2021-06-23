import useSWR from "swr";
import Fuse from "fuse.js";
import { useState } from "react";
import { root_url } from "./url";
const options = {
	// isCaseSensitive: false,
	// includeScore: false,
	shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.3,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	minMatchCharLength: 2,
	keys: ["title"],
};
function search(list, pattern) {
	const fuse = new Fuse(list, options);

	return fuse.search(pattern).map((current) => current.item);
}
// import productFetcher from 'utils/api/product';
const productFetcher = (url) => fetch(url).then((res) => res.json());
interface Props {
	type: string;
	text?: any;
	category?: any;
	offset?: number;
	limit?: number;
}
export default function useProducts(variables: Props) {
	const { type, text, category, offset = 0, limit = 20 } = variables ?? {};
	// const { data, mutate, error } = useSWR("/api/products.json", productFetcher);
	const { data, mutate, error } = useSWR(
		`${root_url}/api/products.json`,
		productFetcher
	);

	// console.log("products => ", data);

	const loading = !data && !error;
	// need to remove when you using real API integration
	// const [formattedData, setFormattedData] = useState(false);
	let products = data?.filter((current) =>
		type ? current.type === type : true
	);

	if (category) {
		products = products?.filter((product) =>
			product.categories.find(
				(category_item) => category_item.slug === category
			)
		);
	}

	// with category

	if (text) {
		products = search(products, text);
	}

	return {
		loading,
		error,
		data: products,
		// hasMore,
		mutate,
		// fetchMore,
	};
}
