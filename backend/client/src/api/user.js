import axios from "./../libs/useAuth";

export const authenticate = async (d) => {
	const { data } = await axios.post("/auth", d);
	return data;
};
