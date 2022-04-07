const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// @desc Register a user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	// Destructuring the request body
	const { email, password } = req.body

	// Validating if all the fields have been filled
	if (!email || !password) {
		res.status(400)
		throw new Error('Please fill all the fields')
	}

	// Check if the user already exists
	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	// Hashing the password
	const salt = await bcrypt.genSalt()
	const hashedPassword = await bcrypt.hash(password, salt)

	// Creating the user
	const user = await User.create({
		email: req.body.email,
		password: hashedPassword,
	})

	// Check if the user was created
	if (user) {
		res.status(201).json({
			_id: user.id,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	// De structuring the request body
	const { email, password } = req.body

	// Validating if all the fields have been filled
	if (!email || !password) {
		res.status(400)
		throw new Error('Please fill all the fields')
	}

	// Check for user email
	const user = await User.findOne({ email })

	// Check if the password matches
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid credentials')
	}
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const myUser = asyncHandler(async (req, res) => {
	res.json(req.user)
})

// Generate user token using JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_CODE, {
		expiresIn: '3d',
	})
}

module.exports = {
	registerUser,
	loginUser,
	myUser,
}
