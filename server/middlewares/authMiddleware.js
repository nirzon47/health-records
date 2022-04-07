const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Get token from the header
			// Splitting the authorization header into an array and taking the second index which contains the token
			// The bearer token starts with 'Bearer token'
			token = req.headers.authorization.split(' ')[1]

			// Decode the token and verify it
			const decoded = jwt.verify(token, process.env.JWT_CODE)

			// Get user from the token but not the hashed password
			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.log(error)
			res.status(401)
			throw new Error('Not authorized')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

module.exports = { protect }
