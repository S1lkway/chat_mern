const express = require('express')
const router = express.Router()
const {
  addContact,
  deleteContact,
} = require('../controllers/contactController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', addContact)          // '/api/users'
router.delete('/:id', deleteContact)        // '/api/users/login'

module.exports = router