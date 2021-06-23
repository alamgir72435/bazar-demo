const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

module.exports = Category = mongoose.model("categories", categorySchema);
