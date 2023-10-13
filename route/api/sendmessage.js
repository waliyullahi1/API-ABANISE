
const express = require('express')
const router = express.Router()
const sendmessage = require('../../controllers/sendmessage')


router.post('/', sendmessage)

module.exports = router;