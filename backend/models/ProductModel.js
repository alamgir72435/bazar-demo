const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		// required: true,
	},
	image: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	unit: {
		type: String,
	},
	price: {
		type: Number,
	},
	privousPrice: {
		type: String,
	},
	discountInPercent: {
		type: Number,
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: "categories",
	},
	deleted: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

module.exports = Product = mongoose.model("products", productSchema);
