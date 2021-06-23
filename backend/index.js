const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const asyncHandler = require("express-async-handler");
const Product = require("./models/ProductModel");
const Category = require("./models/CategoryModel");

const config = require("./setting/config");
var options = {
	root: path.join(__dirname),
};
app.use(cors());

app.use(
	fileUpload({
		useTempFiles: true,
	})
);

// Connect DB
config.__db_connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes"));
app.use("/customer", require("./routes/customer"));
app.use("/product", require("./routes/product"));
app.use("/order", require("./routes/order"));
app.use("/auth", require("./routes/auth"));

app.get(
	"/api/categories.json",
	asyncHandler(async (req, res) => {
		// res.sendFile("/api/categories.json", options);
		const categories = await Category.find({ deleted: false });
		res.json(
			categories.map((e, i) => ({ ...e._doc, type: "grocery", id: i + 1 }))
		);
	})
);

app.get("/api/orders.json", (req, res) => {
	res.sendFile("/api/orders.json", options);
});

app.get(
	"/api/products.json",
	asyncHandler(async (req, res) => {
		const products = await Product.find({ deleted: false }).populate(
			"categoryId"
		);
		let data = [];
		products.forEach((e, i) => {
			if (!e.deleted && !e.disabled) {
				data.push({
					...e._doc,
					categories: [{ slug: e.categoryId.slug, id: i + 1, title: e.title }],
					id: i + 1,
					salePrice: e.price,
					gallery: [{ url: e.image }],
					slug: e._id,
					type: e._id,
				});
			}
		});

		// console.log(data);
		res.json(data);
	})
);

app.get("/api/user.json", (req, res) => {
	res.sendFile("/api/user.json", options);
});

// এই গুলা নিছে ফালায় দিলাম

app.get("/api/vendors.json", (req, res) => {
	res.sendFile("/api/vendors.json", options);
});

app.get("/api/coupon.json", (req, res) => {
	res.sendFile("/api/coupon.json", options);
});

// Error Handle under the Route
app.use((req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});

app.use((err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
