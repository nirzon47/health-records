const router = require('express').Router()
const {
	getRecords,
	postRecords,
	putRecords,
} = require('../controllers/recordsController')
const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect, getRecords).post(protect, postRecords)

router.route('/:id').put(protect, putRecords)

module.exports = router
