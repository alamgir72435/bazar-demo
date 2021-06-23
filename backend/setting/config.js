const mongoose = require("mongoose");

const config = {};

config.__db_connect = async () => {
	try {
		const URI =
			"mongodb+srv://admin:admin@cluster0.elas7.mongodb.net/almonzy?retryWrites=true&w=majority";
		await mongoose.connect(URI, {
			useFindAndModify: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log("Mongoodb Connected...");
	} catch (error) {
		console.log("DB Not Connected ! check");
	}
};

module.exports = config;
