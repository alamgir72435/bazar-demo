import { useEffect, useRef } from "react";
import Head from "next/head";
// import Router from "next/router";
import Link from "next/link";

// the redirect will only happen on the client-side. This is by design,
const IndexPage: React.FC<{}> = () => {
	// useEffect(() => {
	// 	Router.replace("/[type]", "/home");
	// });

	const buttonRef = useRef();

	useEffect(() => {
		if (buttonRef) {
			if (buttonRef.current !== undefined) {
				const node = buttonRef.current as any;
				node.click();
			}
		}
	}, [buttonRef]);

	return (
		<>
			<Head>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<Link href="/home">
				<a ref={buttonRef}>Home</a>
			</Link>
		</>
	);
};

export default IndexPage;
