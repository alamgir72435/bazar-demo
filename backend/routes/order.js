const express = require("express");
const router = express.Router();
const Order = require("./../models/OrderModel");
const asyncHandler = require("express-async-handler");
const Customer = require("./../models/CustomerModel");

router.get(
	"/all",
	asyncHandler(async (req, res) => {
		const orders = await Order.find({}).populate("userId");
		res.json(Array.from(orders).reverse());
	})
);

router.post(
	"/delivered",
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const order = await Order.findOne({ _id: id });
		if (!order) throw Error("Order not found !");
		order.isDelivered = true;
		order.deliveredAt = Date.now();
		await order.save();
		res.send("Delivered");
	})
);

router.post(
	"/new",
	asyncHandler(async (req, res) => {
		const { items, user } = req.body;
		const { name, address, phone } = user;

		if (name === "") throw Error("name must not be empty !");
		if (address === "") throw Error("Address must not be empty !");
		if (phone === "") throw Error("phone must not be empty !");

		const customer = await new Customer({
			...user,
		}).save();

		let amount = 0;
		for (item of items) {
			amount += item.quantity * item.salePrice;
		}

		const orders = await Order.find({});
		let numbers = orders.map((order) => parseInt(order.order_no));
		let serializeNumbers = numbers
			.filter((x) => !isNaN(x))
			.sort((a, b) => a - b);
		let serialNumber = `${serializeNumbers[serializeNumbers.length - 1] + 1}`;
		if (isNaN(serialNumber)) {
			serialNumber = 1001;
		} else {
			parseInt(serialNumber) + 1;
		}

		// save order
		const newOrder = await new Order({
			userId: customer._id,
			products: items,
			amount,
			_date: Date.now(),
			order_no: serialNumber,
		}).save();

		res.json({
			_id: newOrder._id,
			order_no: newOrder.order_no,
			address: address,
			amount,
			date: Date.now(),
			totalItem: items.length,
		});
	})
);

module.exports = router;
