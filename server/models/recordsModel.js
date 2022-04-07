// Schema for the records for each user

const mongoose = require('mongoose')

const recordsSchema = mongoose.Schema(
	{
		// Connects to the user in users Schema so they have the records have a reference of a user to them
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'user',
		},
		name: {
			type: String,
			required: [true, 'Please enter your name'],
		},
		height: {
			type: Number,
			required: [true, 'Please enter your height'],
		},
		weight: {
			type: Number,
			required: [true, 'Please enter your height'],
		},
		age: {
			type: Number,
			required: [true, 'Please enter your height'],
		},
		bmi: {
			type: Number,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('record', recordsSchema)
