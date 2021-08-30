const { Router} = require('express')
const controller = require('./users.controller')
const { verifyAuthToken } = require('../../middlewares/auth')

const router = Router()

router.route('/')
  .post(verifyAuthToken, controller.create)
  .get(verifyAuthToken, controller.list)

exports.router = router