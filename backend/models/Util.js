const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UtilSchema = new Schema({
	logo: {
		type: String,
		required: true,
	},
	privacy: {
		type: String,
	},
	underMaintain: {
		type: Boolean,
		default: false,
	},
});

module.exports = Util = mongoose.model("utils", UtilSchema);
