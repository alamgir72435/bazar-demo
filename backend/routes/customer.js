const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Customer = require("./../models/CustomerModel");

router.get(
	"/all",
	asyncHandler(async (req, res) => {
		const customers = await Customer.find({ deleted: false });
		res.json(Array.from(customers).reverse());
	})
);

router.post(
	"/add",
	asyncHandler(async (req, res) => {
		const { name, email, phone, address } = req.body;
		if (name === "") throw Error("Name must not be empty !");
		await new Customer({
			name,
			email,
			phone,
			address,
		}).save();
		res.send("added");
	})
);

router.post(
	"/update",
	asyncHandler(async (req, res) => {
		const { id, name, email, phone, address } = req.body;
		if (name === "") throw Error("Name must not be empty !");
		if (id === "") throw Error("Id Not found !");
		const customer = await Customer.findOne({ _id: id });
		if (!customer) throw Error("Customer Not found !");
		customer.name = name;
		customer.email = email;
		customer.phone = phone;
		customer.address = address;
		res.send("added");
	})
);

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const customer = await Customer.findOne({ _id: req.params.id });
		if (!customer) throw Error("Customer Not found !");
		customer.deleted = true;
		await customer.save();
		res.send("Deleted!");
	})
);

module.exports = router;
