import axios from "./../libs/useAuth";

export const bannerAdd = async (d) => {
	const { data } = await axios.post("/banner", d);
	return data;
};

export const fetchBanner = async () => {
	const { data } = await axios.get("/banner");
	return data;
};

export const deleteBanner = async ({ id }) => {
	const { data } = await axios.delete(`/banner/${id}`);
	return data;
};
