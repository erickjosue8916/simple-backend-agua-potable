const { Router} = require('express')
const controller = require('./users.controller')

const router = Router()

router.route('/')
  .post(controller.create)
  .get(controller.list)

exports.router = router