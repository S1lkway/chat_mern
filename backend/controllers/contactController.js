const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')

//* desc Add Contact
//* route POST /api/contacts
//* access Private
const addContact = asyncHandler(async (req, res) => {
})

//* desc Delete Contact
//* route DELETE /api/contacts/:id
//* access Private
const deleteContact = asyncHandler(async (req, res) => {
})


module.exports = {
  addContact,
  deleteContact,
}