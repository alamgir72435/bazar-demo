import axios from "./../libs/useAuth";

export const addProduct = async (d) => {
	const { data } = await axios.post("/product/add", d);
	return data;
};

export const updateProduct = async (d) => {
	const { data } = await axios.post("/product/update", d);
	return data;
};

export const fetchProduct = async () => {
	const { data } = await axios.get("/product/all");
	return data;
};

export const disableProduct = async (info) => {
	const { data } = await axios.post("/product/disable", info);
	return data;
};

export const enableProduct = async (info) => {
	const { data } = await axios.post("/product/enable", info);
	return data;
};

export const deleteProduct = async (info) => {
	const { data } = await axios.post("/product/delete", info);
	return data;
};

// ============================================================

export const addCategory = async (d) => {
	const { data } = await axios.post("/product/category/add", d);
	return data;
};

export const udpateCategory = async (d) => {
	const { data } = await axios.put("/product//category/update", d);
	return data;
};

export const deleteCategory = async ({ id }) => {
	const { data } = await axios.delete(`/product/category/${id}`);
	return data;
};

export const fetchCategory = async () => {
	const { data } = await axios.get("/product/category/all");
	return data;
};

export const upload = async (d) => {
	const { data } = await axios.post("/upload", d);
	return data;
};
