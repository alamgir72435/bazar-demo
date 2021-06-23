import axios from "./../libs/useAuth";

export const utilUpdate = async (d) => {
	const { data } = await axios.post("/util", d);
	return data;
};

export const fetchUtil = async () => {
	const { data } = await axios.get("/util");
	return data;
};
