const mongoose = require("mongoose");

const filoSchema = new mongoose.Schema({
		name: String,
		age: String,
		point: String,
}, {collection: "Filosofia"});

module.exports = mongoose.model("Filosofia", filoSchema);
