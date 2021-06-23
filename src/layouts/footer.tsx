import styled from "styled-components";
import css from "@styled-system/css";
import { FormattedMessage } from "react-intl";
const Box = styled.div(
	css({
		fontFamily: "body",
		fontSize: "sm",
		fontWeight: "regular",
		color: "text.regular",
		px: 20,

		a: {
			color: "primary.regular",
		},
	}),
	{
		marginTop: 50,
		width: "100%",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}
);
const Footer = () => {
	return (
		<Box>
			<span>Almonzy is Developed By</span>
			&nbsp;
			<a href="https://binarybunon.com" target="_blank">
				Binary Bunon
			</a>
		</Box>
	);
};
export default Footer;
