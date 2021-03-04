const {
  gateway: gatewayController
} = require('../controllers')

const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', gatewayController.checkAccessLimit)

module.exports = router