const express = require("express");
const router = express.Router();
const Category = require("./../models/CategoryModel");
const Product = require("./../models/ProductModel");
const asyncHandler = require("express-async-handler");
router.get("/", (req, res) => {
	res.send("-");
});

router.get(
	"/all",
	asyncHandler(async (req, res) => {
		const products = await Product.find({ deleted: false });
		res.json(products);
	})
);

router.post(
	"/disable",
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const product = await Product.findOne({ _id: id });
		if (!product) throw Error("Product not found !");
		product.disabled = true;
		await product.save();
		res.send("Disabled");
	})
);

router.post(
	"/enable",
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const product = await Product.findOne({ _id: id });
		if (!product) throw Error("Product not found !");
		product.disabled = false;
		await product.save();
		res.send("Disabled");
	})
);

router.post(
	"/delete",
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const product = await Product.findOne({ _id: id });
		if (!product) throw Error("Product not found !");
		product.deleted = true;
		await product.save();
		res.send("Disabled");
	})
);

router.post(
	"/add",
	asyncHandler(async (req, res) => {
		const {
			title,
			slug,
			image,
			description,
			unit,
			price,
			discountInPercent,
			categoryId,
			privousPrice,
		} = req.body;

		if (title === "") throw Error("Title must not empty !");
		if (image === "") throw Error("image must not empty !");
		if (price === "") throw Error("Price must not empty !");
		if (unit === "") throw Error("Unit must not empty !");
		if (description === "") throw Error("Description must not empty !");
		await new Product({
			slug,
			title,
			image,
			description,
			unit,
			price,
			discountInPercent,
			categoryId,
			privousPrice,
		}).save();
		res.send("Added successfully");
	})
);

router.post(
	"/update",
	asyncHandler(async (req, res) => {
		const {
			id,
			title,
			slug,
			image,
			description,
			unit,
			price,
			discountInPercent,
			categoryId,
			privousPrice,
		} = req.body;

		if (title === "") throw Error("Title must not empty !");
		if (image === "") throw Error("image must not empty !");
		if (price === "") throw Error("Price must not empty !");
		if (unit === "") throw Error("Unit must not empty !");
		if (description === "") throw Error("Description must not empty !");

		const product = await Product.findOne({ _id: id });
		if (!product) throw Error("Product Not found !");

		product.slug = slug;
		product.title = title;
		product.image = image;
		product.description = description;
		product.unit = unit;
		product.price = price;
		product.discountInPercent = discountInPercent;
		product.categoryId = categoryId;
		product.privousPrice = privousPrice;

		await product.save();
		res.send("Updated successfully");
	})
);

// Category

router.get(
	"/category/all",
	asyncHandler(async (req, res) => {
		const categories = await Category.find({ deleted: false });
		res.json(categories);
	})
);

router.post(
	"/category/add",
	asyncHandler(async (req, res) => {
		const { title, slug, icon } = req.body;
		if (title === "") throw Error("Category Title must not empty !");
		await new Category({
			title,
			slug,
			icon,
		}).save();
		res.send("category Added successfully");
	})
);

router.delete(
	"/category/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		if (!id) throw Error("ID not found !");
		const category = await Category.findOne({ _id: id });
		if (category === "") throw Error("category not found");
		category.deleted = true;
		await category.save();
		res.send("Deleted");
	})
);

router.put(
	"/category/update",
	asyncHandler(async (req, res) => {
		const { id, icon, slug, title } = req.body;
		if (!id) throw Error("ID not found !");
		const category = await Category.findOne({ _id: id });
		if (category === "") throw Error("category not found");
		category.icon = icon;
		category.slug = slug;
		category.title = title;
		await category.save();
		res.send("Updated");
	})
);

module.exports = router;
