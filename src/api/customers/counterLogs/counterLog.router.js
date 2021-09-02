const { Router} = require('express')
const controller = require('./counterLog.controller')

const router = Router()

router.route('/')
  .get(controller.list)
  .post(controller.create)

router.get('/char', controller.char)

exports.router = router