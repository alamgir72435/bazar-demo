import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Sticky from "react-stickynode";
import {
	StyledContainer,
	StyledContent,
	StyledLink,
	StyledLeftContent,
	StyledLeftInnerContent,
	StyledRightContent,
	StyledContentHeading,
} from "features/terms-and-services/terms-and-services";
import { Heading } from "components/heading/heading";
import { Element } from "react-scroll";
import { SEO } from "components/seo";
import { useMedia } from "utils/use-media";
import { sitePrivacyPolicy } from "site-settings/site-privacy-policy";
import axios from "axios";
import { root_url } from "./../data/url";
const PrivacyPage: NextPage<{}> = () => {
	const { title, date, content } = sitePrivacyPolicy;
	const mobile = useMedia("(max-width: 580px)");
	const menuItems: string[] = [];
	content.forEach((item) => {
		menuItems.push(item.title);
	});

	const [privacy, setPrivacy] = useState("");
	const loadbanner = async () => {
		try {
			const { data } = await axios.get(`${root_url}/util`);
			setPrivacy(data?.privacy);
		} catch (error) {}
	};

	useEffect(() => {
		loadbanner();
	}, []);

	return (
		<>
			<SEO title={title} description="PickBazar privacy page" />

			<StyledContainer>
				<StyledContent>
					<StyledRightContent>
						<div style={{ paddingLeft: 20, paddingRight: 20 }}>
							{
								<div
									className="html-content"
									dangerouslySetInnerHTML={{
										__html: privacy,
									}}
								/>
							}
						</div>
					</StyledRightContent>
				</StyledContent>
			</StyledContainer>
		</>
	);
};

export default PrivacyPage;
