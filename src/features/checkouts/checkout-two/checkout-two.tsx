import React, { useContext, useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { Button } from "components/button/button";
import { CURRENCY } from "utils/constant";
import { Scrollbar } from "components/scrollbar/scrollbar";
import CheckoutWrapper, {
	CheckoutContainer,
	CheckoutInformation,
	InformationBox,
	DeliverySchedule,
	CheckoutSubmit,
	HaveCoupon,
	CouponBoxWrapper,
	CouponInputBox,
	CouponCode,
	RemoveCoupon,
	TermConditionText,
	TermConditionLink,
	CartWrapper,
	CalculationWrapper,
	OrderInfo,
	Title,
	ItemsWrapper,
	Items,
	Quantity,
	Multiplier,
	ItemInfo,
	Price,
	TextWrapper,
	Text,
	Bold,
	Small,
	NoProductMsg,
	NoProductImg,
} from "./checkout-two.style";

import { NoCartBag } from "assets/icons/NoCartBag";

import Sticky from "react-stickynode";
import { ProfileContext } from "contexts/profile/profile.context";
import { FormattedMessage } from "react-intl";
import { useCart } from "contexts/cart/use-cart";
import { useLocale } from "contexts/language/language.provider";
import { useWindowSize } from "utils/useWindowSize";
import Coupon from "features/coupon/coupon";
import Schedules from "features/schedule/schedule";
import Contact from "features/contact/contact";
import Payment from "features/payment/payment";
import Address from "features/address/address";
import axios from "axios";
import { root_url } from "../../../data/url";
// The type of props Checkout Form receives
interface MyFormProps {
	token: string;
	deviceType: any;
}

type CartItemProps = {
	product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
	const { id, quantity, title, name, unit, price, salePrice } = product;
	const displayPrice = salePrice ? salePrice : price;
	return (
		<Items key={id}>
			<Quantity>{quantity}</Quantity>
			<Multiplier>x</Multiplier>
			<ItemInfo>
				{name ? name : title} {unit ? `| ${unit}` : ""}
			</ItemInfo>
			<Price>
				{CURRENCY}
				{(displayPrice * quantity).toFixed(2)}
			</Price>
		</Items>
	);
};

const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType }) => {
	const { state } = useContext(ProfileContext);
	const {
		items,
		clearCart,
		cartItemsCount,
		calculatePrice,
		calculateDiscount,
		calculateSubTotalPrice,
		isRestaurant,
		toggleRestaurant,
	} = useCart();
	const [loading, setLoading] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const { address, contact, card, schedules } = state;
	const size = useWindowSize();

	// Send Data to Database
	const [user, setUser] = useState({
		name: "",
		phone: "",
		address: "",
	});

	const handleSubmit = async () => {
		try {
			if (user.name === "") {
				alert("Please fill your name !");
			} else if (user.phone === "") {
				alert("Please fill your valid phone !");
			} else if (user.address === "") {
				alert("Please fill your address");
			} else {
				setLoading(true);
				const { data } = await axios.post(`${root_url}/order/new`, {
					items,
					user,
				});

				localStorage.setItem("cart", JSON.stringify(items));
				localStorage.setItem("order", JSON.stringify(data));

				if (isValid) {
					clearCart();
					Router.push("/order-received");
				}
				setLoading(false);
			}
		} catch (error) {
			console.log("Error");
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			calculatePrice() > 0 &&
			cartItemsCount > 0 &&
			address.length &&
			contact.length &&
			card.length &&
			schedules.length
		) {
			setIsValid(true);
		}
	}, [state]);

	useEffect(() => {
		return () => {
			if (isRestaurant) {
				toggleRestaurant();
				clearCart();
			}
		};
	}, []);

	return (
		<form>
			<CheckoutWrapper>
				<CheckoutContainer>
					<CheckoutInformation>
						{/* DeliveryAddress */}
						<InformationBox>
							<span style={{ color: "#b7b8c1" }}>Full name</span>
							<input
								style={{
									fontSize: 15,
									width: "100%",
									height: 35,
									marginBottom: 20,
									marginTop: 10,
									border: "1px solid #b7b8c1",
									padding: 5,
									outline: "none",
								}}
								type="text"
								placeholder="name"
								value={user.name}
								onChange={(e) =>
									setUser((p) => ({ ...p, name: e.target.value }))
								}
							/>
							<span style={{ color: "#b7b8c1" }}>
								Enter your Shipping Address
							</span>
							<textarea
								style={{
									width: "100%",
									padding: 10,
									border: "1px solid #ddd",
									fontSize: 15,
									marginTop: 10,
									outline: "none",
								}}
								value={user.address}
								onChange={(e) =>
									setUser((p) => ({ ...p, address: e.target.value }))
								}
								placeholder="Address"
							></textarea>
						</InformationBox>

						{/* Contact number */}
						<InformationBox>
							<span style={{ color: "#b7b8c1" }}>valid phone</span>
							<input
								style={{
									fontSize: 15,
									width: "100%",
									height: 35,
									padding: 5,
									outline: "none",
									marginTop: 10,
									border: "1px solid #ddd",
								}}
								value={user.phone}
								type="text"
								onChange={(e) =>
									setUser((p) => ({ ...p, phone: e.target.value }))
								}
								placeholder="01881818181"
							/>
						</InformationBox>
						{/* PaymentOption */}

						<InformationBox
							className="paymentBox"
							style={{ paddingBottom: 30 }}
						>
							<TermConditionText>
								<FormattedMessage
									id="termAndConditionHelper"
									defaultMessage="By making this purchase you agree to our"
								/>
								<Link href="#">
									<TermConditionLink>
										<FormattedMessage
											id="termAndCondition"
											defaultMessage="terms and conditions."
										/>
									</TermConditionLink>
								</Link>
							</TermConditionText>

							{/* CheckoutSubmit */}
							<CheckoutSubmit>
								<Button
									type="button"
									onClick={handleSubmit}
									disabled={!isValid}
									size="big"
									loading={loading}
									style={{ width: "100%" }}
								>
									<FormattedMessage
										id="processCheckout"
										defaultMessage={
											loading ? "Processing" : "Proceed to Checkout"
										}
									/>
								</Button>
							</CheckoutSubmit>
						</InformationBox>
					</CheckoutInformation>

					<CartWrapper>
						<Sticky
							enabled={size.width >= 768 ? true : false}
							top={120}
							innerZ={999}
						>
							<OrderInfo>
								<Title>
									<FormattedMessage
										id="cartTitle"
										defaultMessage="Your Order"
									/>
								</Title>

								<Scrollbar className="checkout-scrollbar">
									<ItemsWrapper>
										{cartItemsCount > 0 ? (
											items.map((item) => (
												<OrderItem key={`cartItem-${item.id}`} product={item} />
											))
										) : (
											<>
												<NoProductImg>
													<NoCartBag />
												</NoProductImg>

												<NoProductMsg>
													<FormattedMessage
														id="noProductFound"
														defaultMessage="No products found"
													/>
												</NoProductMsg>
											</>
										)}
									</ItemsWrapper>
								</Scrollbar>

								<CalculationWrapper>
									<TextWrapper>
										<Text>
											<FormattedMessage
												id="subTotal"
												defaultMessage="Subtotal"
											/>
										</Text>
										<Text>
											{CURRENCY}
											{calculateSubTotalPrice()}
										</Text>
									</TextWrapper>

									<TextWrapper>
										<Text>
											<FormattedMessage
												id="intlOrderDetailsDelivery"
												defaultMessage="Delivery Fee"
											/>
										</Text>
										<Text>{CURRENCY}0.00</Text>
									</TextWrapper>

									<TextWrapper>
										<Text>
											<FormattedMessage
												id="discountText"
												defaultMessage="Discount"
											/>
										</Text>
										<Text>
											{CURRENCY}
											{calculateDiscount()}
										</Text>
									</TextWrapper>

									<TextWrapper style={{ marginTop: 20 }}>
										<Bold>
											<FormattedMessage id="totalText" defaultMessage="Total" />{" "}
											<Small>
												(
												<FormattedMessage
													id="vatText"
													defaultMessage="Incl. VAT"
												/>
												)
											</Small>
										</Bold>
										<Bold>
											{CURRENCY}
											{calculatePrice()}
										</Bold>
									</TextWrapper>
								</CalculationWrapper>
							</OrderInfo>
						</Sticky>
					</CartWrapper>
				</CheckoutContainer>
			</CheckoutWrapper>
		</form>
	);
};

export default CheckoutWithSidebar;
