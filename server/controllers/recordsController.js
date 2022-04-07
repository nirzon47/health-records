const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Records = require('../models/recordsModel')

// @desc Get records
// @route GET /api/records
// @access Private
const getRecords = asyncHandler(async (req, res) => {
	const records = await Records.find({ user: req.user.id })
	res.json(records)
})

// @desc Set records
// @route POST /api/records
// @access Private
const postRecords = asyncHandler(async (req, res) => {
	// Destructuring the request body
	const { name, height, weight, age } = req.body

	// Validating if all the fields have been filled
	if (!req.body.name || !req.body.height || !req.body.weight || !req.body.age) {
		res.status(400)
		throw new Error('Please fill in all the fields')
	}

	// Calculating BMI
	heightInMetres = height / 100
	let BMI = weight / (heightInMetres * heightInMetres)

	// Posting the records
	const records = await Records.create({
		user: req.user.id,
		name: name,
		height: height,
		weight: weight,
		age: age,
		bmi: BMI,
	})

	res.json(records)
})

// @desc Edit records
// @route PUT /api/records/:id
// @access Private
const putRecords = asyncHandler(async (req, res) => {
	const records = await Records.findById(req.params.id)

	if (!records) {
		res.status(400)
		throw new Error('Records not found')
	}

	// Checks if the user is logged in
	if (!req.user) {
		res.status(401)
		throw new Error('User not found')
	}

	// Make sure the logged in user matches the goal user
	if (records.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	// Check if the user has entered their height and weight or not
	// If the user has entered their height or weight, take that value, otherwise use the value that was already stored
	let height = req.body.height ? req.body.height : records.height
	let weight = req.body.weight ? req.body.weight : records.weight

	// Calculate BMI
	heightInMetres = height / 100
	let BMI = weight / (heightInMetres * heightInMetres)

	// Updates the records
	const updatedRecord = await Records.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			height: req.body.height,
			weight: req.body.weight,
			age: req.body.age,
			bmi: BMI,
		},
		{ new: true, runValidators: true }
	)
	res.json(updatedRecord)
})

module.exports = { getRecords, postRecords, putRecords }
