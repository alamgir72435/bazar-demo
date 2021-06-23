const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FaqSchema = new Schema({
	question: {
		type: String,
		required: true,
	},
	answar: {
		type: String,
		required: true,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

module.exports = FAQ = mongoose.model("faq", FaqSchema);
