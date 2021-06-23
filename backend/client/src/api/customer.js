import axios from "../libs/useAuth";

export const fetchCustomers = async () => {
	const { data } = await axios.get("/customer/all");
	return data;
};
