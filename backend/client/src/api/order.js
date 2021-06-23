import axios from "./../libs/useAuth";

export const fetchOrder = async () => {
	const { data } = await axios.get("/order/all");
	return data;
};

export const deliveredOrder = async (info) => {
	const { data } = await axios.post("/order/delivered", info);
	return data;
};
