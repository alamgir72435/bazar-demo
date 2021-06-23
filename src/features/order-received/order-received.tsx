import React, { useEffect, useState } from "react";
import Link from "next/link";
import OrderReceivedWrapper, {
	OrderReceivedContainer,
	OrderInfo,
	OrderDetails,
	TotalAmount,
	BlockTitle,
	Text,
	InfoBlockWrapper,
	InfoBlock,
	ListItem,
	ListTitle,
	ListDes,
} from "./order-received.style";
import { FormattedMessage } from "react-intl";
import moment from "moment";
type OrderReceivedProps = {};

const OrderReceived: React.FunctionComponent<OrderReceivedProps> = (props) => {
	const [state, setState] = useState(null);
	const loadData = () => {
		try {
			const data = localStorage.getItem("order");
			if (data) {
				setState(JSON.parse(data));
			}
		} catch (error) {}
	};
	useEffect(() => {
		//
		loadData();
	}, []);

	return (
		<OrderReceivedWrapper>
			<OrderReceivedContainer>
				<Link href="/">
					<a className="home-btn">
						<FormattedMessage id="backHomeBtn" defaultMessage="Back to Home" />
					</a>
				</Link>

				<OrderInfo>
					<BlockTitle>
						<FormattedMessage
							id="orderReceivedText"
							defaultMessage="Order Received"
						/>
					</BlockTitle>

					<Text>
						<FormattedMessage
							id="orderReceivedSuccess"
							defaultMessage="Thank you. Your order has been received"
						/>
					</Text>

					<InfoBlockWrapper>
						<InfoBlock>
							<Text bold className="title">
								<FormattedMessage
									id="orderNumberText"
									defaultMessage="Order Number"
								/>
							</Text>
							<Text>{state?.order_no}</Text>
						</InfoBlock>

						<InfoBlock>
							<Text bold className="title">
								<FormattedMessage id="orderDateText" defaultMessage="Date" />
							</Text>
							<Text>{state?.date ? moment(state.date).format("LLL") : ""}</Text>
						</InfoBlock>

						<InfoBlock>
							<Text bold className="title">
								<FormattedMessage id="totalText" defaultMessage="Total" />
							</Text>
							<Text>৳ {state?.amount}</Text>
						</InfoBlock>

						<InfoBlock>
							<Text bold className="title">
								<FormattedMessage
									id="paymenMethodText"
									defaultMessage="Payment Method"
								/>
							</Text>
							<Text>
								<FormattedMessage
									id="paymentMethodName"
									defaultMessage="Cash on delivery"
								/>
							</Text>
						</InfoBlock>
					</InfoBlockWrapper>
				</OrderInfo>

				<OrderDetails>
					<BlockTitle>
						<FormattedMessage
							id="orderDetailsText"
							defaultMessage="Order Details"
						/>
					</BlockTitle>

					<ListItem>
						<ListTitle>
							<Text bold>
								<FormattedMessage
									id="totalItemText"
									defaultMessage="Total Item"
								/>
							</Text>
						</ListTitle>
						<ListDes>
							<Text>{state?.totalItem} Items</Text>
						</ListDes>
					</ListItem>

					<ListItem>
						<ListTitle>
							<Text bold>
								<FormattedMessage
									id="orderTimeText"
									defaultMessage="Order Time"
								/>
							</Text>
						</ListTitle>
						<ListDes>
							<Text>{state?.date ? moment(state.date).format("LLL") : ""}</Text>
						</ListDes>
					</ListItem>

					{/* <ListItem>
						<ListTitle>
							<Text bold>
								<FormattedMessage
									id="deliveryTimeText"
									defaultMessage="Delivery Time"
								/>
							</Text>
						</ListTitle>
						<ListDes>
							<Text>90 Minute Express Delivery</Text>
						</ListDes>
					</ListItem> */}

					<ListItem>
						<ListTitle>
							<Text bold>
								<FormattedMessage
									id="deliveryLocationText"
									defaultMessage="Delivery Location"
								/>
							</Text>
						</ListTitle>
						<ListDes>
							<Text>{state?.address}</Text>
						</ListDes>
					</ListItem>
				</OrderDetails>

				<TotalAmount>
					<BlockTitle>
						<FormattedMessage
							id="totalAmountText"
							defaultMessage="Total Amount"
						/>
					</BlockTitle>

					<ListItem>
						<ListTitle>
							<Text bold>
								<FormattedMessage id="subTotal" defaultMessage="Sub total" />
							</Text>
						</ListTitle>
						<ListDes>
							<Text>৳ {state?.amount}</Text>
						</ListDes>
					</ListItem>

					<ListItem>
						<ListTitle>
							<Text bold>
								<FormattedMessage
									id="paymenMethodText"
									defaultMessage="Payment Method"
								/>
							</Text>
						</ListTitle>
						<ListDes>
							<Text>Cash On Delivery</Text>
						</ListDes>
					</ListItem>

					<ListItem>
						<ListTitle>
							<Text bold>
								<FormattedMessage id="totalText" defaultMessage="Total" />
							</Text>
						</ListTitle>
						<ListDes>
							<Text>৳ {state?.amount}</Text>
						</ListDes>
					</ListItem>
				</TotalAmount>
			</OrderReceivedContainer>
		</OrderReceivedWrapper>
	);
};

export default OrderReceived;
