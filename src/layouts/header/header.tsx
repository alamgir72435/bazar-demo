import React from "react";
import Router, { useRouter } from "next/router";
import { openModal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "features/authentication-form";
import { RightMenu } from "./menu/right-menu/right-menu";
import { LeftMenu } from "./menu/left-menu/left-menu";
import HeaderWrapper from "./header.style";
// import LogoImage from "assets/images/logo.svg";
import LogoImage from "assets/images/logo/almonzy.png";
import UserImage from "assets/images/user.jpg";
import { isCategoryPage } from "../is-home-page";
import Search from "features/search/search";
type Props = {
	className?: string;
};

import axios from "axios";
import { root_url } from "./../../data/url";

const Header: React.FC<Props> = ({ className }) => {
	// Hande logo
	const [util, setUtil] = React.useState({
		logo: "",
		underMaintain: false,
	});
	const loadUtil = async () => {
		try {
			const { data } = await axios.get(`${root_url}/util`);
			setUtil((p) => ({ ...p, logo: data?.logo }));
		} catch (error) {}
	};
	React.useEffect(() => {
		loadUtil();
	}, []);

	const {
		authState: { isAuthenticated },
		authDispatch,
	} = React.useContext<any>(AuthContext);
	const { pathname, query } = useRouter();
	const handleLogout = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("access_token");
			authDispatch({ type: "SIGN_OUT" });
			Router.push("/");
		}
	};

	const handleJoin = () => {
		authDispatch({
			type: "SIGNIN",
		});

		openModal({
			show: true,
			overlayClassName: "quick-view-overlay",
			closeOnClickOutside: true,
			component: AuthenticationForm,
			closeComponent: "",
			config: {
				enableResizing: false,
				disableDragging: true,
				className: "quick-view-modal",
				width: 458,
				height: "auto",
			},
		});
	};
	const showSearch =
		isCategoryPage(query.type) ||
		pathname === "/furniture-two" ||
		pathname === "/grocery-two" ||
		pathname === "/bakery";
	return (
		<HeaderWrapper className={className} id="layout-header">
			<LeftMenu logo={util?.logo ? util.logo : LogoImage} />
			{showSearch && <Search minimal={true} className="headerSearch" />}
			<RightMenu
				isAuthenticated={isAuthenticated}
				onJoin={handleJoin}
				onLogout={handleLogout}
				avatar={UserImage}
			/>
		</HeaderWrapper>
	);
};

export default Header;
