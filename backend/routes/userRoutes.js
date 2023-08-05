const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  editUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)          // '/api/users'
router.post('/login', loginUser)        // '/api/users/login'
router.put('/edit', protect, editUser)  // '/api/users//edit'

module.exports = router