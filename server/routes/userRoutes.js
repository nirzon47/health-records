const {
	registerUser,
	loginUser,
	myUser,
} = require('../controllers/userController')
const router = require('express').Router()
const { protect } = require('../middlewares/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, myUser)

module.exports = router
