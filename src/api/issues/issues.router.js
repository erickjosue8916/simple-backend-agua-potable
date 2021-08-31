const { Router} = require('express')
const controller = require('./issues.controller')
const { verifyAuthToken } = require('../../middlewares/auth')

const router = Router()

router.route('/')
  .post(verifyAuthToken, controller.create)
  .get(controller.list)

exports.router = router