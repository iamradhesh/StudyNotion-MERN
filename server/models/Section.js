const mongoose = require("mongoose");

// Define the Section schema
const sectionSchema = new mongoose.Schema({
	sectionName: {
		type: String,
	},
	subSection: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "subSection",
		},
	],
});

// Export the Section model
module.exports = mongoose.model("Section", sectionSchema);