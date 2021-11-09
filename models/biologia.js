const mongoose = require("mongoose");

const bioSchema = new mongoose.Schema({
		name: String,
		age: String,
		point: String,
}, {collection: "Biologia"});

module.exports = mongoose.model("Biologia", bioSchema);
