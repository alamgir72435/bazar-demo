const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Customer = require("./../models/CustomerModel");
const Product = require("./../models/ProductModel");
const Category = require("./../models/CategoryModel");

const path = require("path");
var options = {
	root: path.join(__dirname),
};

router.get("/", (req, res) => {
	res.send("123");
});

router.get("/categories.json", (req, res) => {
	res.sendFile("/api/categories.json", options);
});

router.get("/orders.json", (req, res) => {
	res.sendFile(".///api/orders.json", options);
});

router.get("/products.json", (req, res) => {
	res.sendFile("/api/products.json", options);
});

router.get("/user.json", (req, res) => {
	res.sendFile("/api/user.json", options);
});

// এই গুলা নিছে ফালায় দিলাম

router.get("/vendors.json", (req, res) => {
	res.sendFile("/api/vendors.json", options);
});

router.get("/coupon.json", (req, res) => {
	res.sendFile("/api/coupon.json", options);
});

module.exports = router;
