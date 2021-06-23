import axios from "./../libs/useAuth";

export const FaqAdd = async (d) => {
	const { data } = await axios.post("/faq", d);
	return data;
};

export const fetchFaq = async () => {
	const { data } = await axios.get("/faq");
	return data;
};

export const deleteFaq = async ({ id }) => {
	const { data } = await axios.delete(`/faq/${id}`);
	return data;
};
