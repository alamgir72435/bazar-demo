import React, { useContext } from "react";
import { openModal } from "@redq/reuse-modal";
import Router from "next/router";
import { FormattedMessage } from "react-intl";
import { Scrollbar } from "components/scrollbar/scrollbar";
import Drawer from "components/drawer/drawer";
import { Button } from "components/button/button";
import NavLink from "components/nav-link/nav-link";
import { CloseIcon } from "assets/icons/CloseIcon";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "features/authentication-form";
import {
	DrawerBody,
	HamburgerIcon,
	DrawerContentWrapper,
	DrawerClose,
	DrawerProfile,
	LogoutView,
	LoginView,
	UserAvatar,
	UserDetails,
	DrawerMenu,
	DrawerMenuItem,
	UserOptionMenu,
} from "./header.style";
import UserImage from "assets/images/user.jpg";
import {
	MOBILE_DRAWER_MENU,
	PROFILE_PAGE,
} from "site-settings/site-navigation";
import { useAppState, useAppDispatch } from "contexts/app/app.provider";

const MobileDrawer: React.FunctionComponent = () => {
	const isDrawerOpen = useAppState("isDrawerOpen");
	const dispatch = useAppDispatch();
	const {
		authState: { isAuthenticated },
		authDispatch,
	} = useContext<any>(AuthContext);
	// Toggle drawer
	const toggleHandler = React.useCallback(() => {
		dispatch({
			type: "TOGGLE_DRAWER",
		});
	}, [dispatch]);

	const handleLogout = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("access_token");
			authDispatch({ type: "SIGN_OUT" });
			Router.push("/");
		}
	};

	const signInOutForm = () => {
		dispatch({
			type: "TOGGLE_DRAWER",
		});

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

	return (
		<Drawer
			width="316px"
			drawerHandler={
				<HamburgerIcon>
					<span />
					<span />
					<span />
				</HamburgerIcon>
			}
			open={isDrawerOpen}
			toggleHandler={toggleHandler}
			closeButton={
				<DrawerClose>
					<CloseIcon />
				</DrawerClose>
			}
		>
			<DrawerBody>
				<Scrollbar className="drawer-scrollbar">
					<DrawerContentWrapper>
						<DrawerMenu>
							{MOBILE_DRAWER_MENU.map((item) => (
								<DrawerMenuItem key={item.id}>
									{item.id !== "nav.order" && (
										<NavLink
											onClick={toggleHandler}
											href={item.href}
											label={item.defaultMessage}
											intlId={item.id}
											className="drawer_menu_item"
										/>
									)}
								</DrawerMenuItem>
							))}
						</DrawerMenu>
					</DrawerContentWrapper>
				</Scrollbar>
			</DrawerBody>
		</Drawer>
	);
};

export default MobileDrawer;
