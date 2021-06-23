const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bannerSchema = new Schema({
	banner: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		default: "",
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

module.exports = Banner = mongoose.model("banners", bannerSchema);
