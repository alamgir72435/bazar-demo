const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");
var rimraf = require("rimraf");
const jwt = require("jsonwebtoken");
const Util = require("./../models/Util");
const Banner = require("./../models/BannerModel");
const FAQ = require("./../models/FAQModel");
// File Upload
cloudinary.config({
	cloud_name: "binarybunon",
	api_key: "337929746124875",
	api_secret: "qEFCmPrDllH9zywutHtpAAAmjHk",
});

router.get("/", (req, res) => {
	res.send("<h1>Running [updated server][1.8.9]</h1>");
});

router.post(
	"/upload",
	asyncHandler(async (req, res, next) => {
		const file = req.files.photo;
		cloudinary.uploader.upload(file.tempFilePath, (err, data) => {
			if (err) throw Error(err);
			rimraf.sync(file.tempFilePath);
			res.json(data);
		});
	})
);

const users = [
	{ id: 1, name: "saif", username: "saif", password: "ffffff" },
	{ id: 2, name: "Nahiduzzaman", username: "nahid", password: "123456" },
];

router.post(
	"/auth",
	asyncHandler(async (req, res) => {
		const { username, password } = req.body;
		if (username === "") throw Error("username not found");
		if (password === "") throw Error("username not found");
		const user = users.find(
			(x) => x.username == username && x.password == password
		);
		if (user) {
			const token = jwt.sign({ id: user.id }, "mypass");

			res.json({ token, user });
		} else {
			throw Error("username or password is not correct");
		}
	})
);

router.get(
	"/util",
	asyncHandler(async (req, res) => {
		const util = await Util.findOne();
		res.json(util);
	})
);

router.post(
	"/util",
	asyncHandler(async (req, res) => {
		const { logo, privacy, underMaintain } = req.body;
		const util = await Util.findOne();
		console.log(req.body);
		if (util) {
			// Update
			util.logo = logo ? logo : util.logo;
			util.privacy = privacy ? privacy : util.privacy;
			util.underMaintain = underMaintain ? underMaintain : util.underMaintain;
			await util.save();
			return res.send("updated");
		} else {
			new Util({
				logo,
				privacy,
				underMaintain,
			}).save();
			return res.send("Added");
		}
	})
);

//
//				Banner
//

router.get(
	"/banner",
	asyncHandler(async (req, res) => {
		const banners = await Banner.find({ deleted: false });
		return res.json(banners);
	})
);

router.post(
	"/banner",
	asyncHandler(async (req, res) => {
		const { banner } = req.body;
		if (!banner) throw Error("Banner Not found !");
		new Banner({
			banner,
		}).save();
		return res.send("Added");
	})
);

router.delete(
	"/banner/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const banner = await Banner.findOne({ _id: id });
		if (!banner) throw Error("Banner not found !");
		banner.deleted = true;
		await banner.save();
		res.send("Deleted");
	})
);

router.get(
	"/faq",
	asyncHandler(async (req, res) => {
		const faqs = await FAQ.find({ deleted: false });
		return res.json(faqs);
	})
);

router.post(
	"/faq",
	asyncHandler(async (req, res) => {
		const { question, answar } = req.body;
		if (question === "") throw Error("Question empty !");
		if (answar === "") throw Error("answar empty !");
		new FAQ({
			question,
			answar,
		}).save();
		return res.send("Added");
	})
);

router.delete(
	"/faq/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const faq = await FAQ.findOne({ _id: id });
		if (!faq) throw Error("faq not found !");
		faq.deleted = true;
		await faq.save();
		res.send("Deleted");
	})
);

module.exports = router;
