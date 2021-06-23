const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	email: {
		type: String,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

module.exports = Customer = mongoose.model("customers", customerSchema);
