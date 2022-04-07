// Backend requests

import axios from 'axios'

const API_URL = '/api/records/'

// Create new record
const createRecord = async (recordData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.post(API_URL, recordData, config)

	return response.data
}

// Edit record
const editRecord = async (recordData, token, recordID) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.put(API_URL + recordID, recordData, config)

	return response.data
}

// Get records
const getRecord = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.get(API_URL, config)

	return response.data
}

const recordsService = {
	createRecord,
	getRecord,
	editRecord,
}

export default recordsService
