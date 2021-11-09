const mongoose = require("mongoose");

const fiSchema = new mongoose.Schema({
		name: String,
		age: String,
		point: String,
}, {collection: "Fisica"});

module.exports = mongoose.model("Fisica", fiSchema);
