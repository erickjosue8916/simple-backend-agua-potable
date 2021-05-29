const { Router} = require('express')
const controller = require('./issues.controller')

const router = Router()

router.route('/')
  .post(controller.create)
  .get(controller.list)

exports.router = router