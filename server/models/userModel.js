// Schema for user authentication details

const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'Please enter your email address'],
		},
		password: {
			type: String,
			required: [true, 'Please enter your password'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('user', userSchema)
