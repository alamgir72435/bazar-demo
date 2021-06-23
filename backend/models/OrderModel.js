const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "customers",
		required: true,
	},
	deliveryTime: {
		type: String,
	},
	amount: {
		type: Number,
	},
	deliveryAddress: {
		type: String,
	},
	subtotal: {
		type: Number,
	},
	discount: {
		type: Number,
	},
	deliveryFee: {
		type: Number,
	},
	products: {
		type: Array,
	},
	_date: {
		type: String,
		required: true,
	},
	order_no: {
		type: String,
		required: true,
	},
	isDelivered: {
		type: Boolean,
		default: false,
	},
	deliveredAt: {
		type: Date,
	},
});

module.exports = Order = mongoose.model("orders", orderSchema);
