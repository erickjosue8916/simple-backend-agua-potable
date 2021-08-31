const { Router} = require('express')
const controller = require('./customers.controller')
const { router: counterLogRouter} = require('./counterLogs/counterLog.router')

const router = Router()

router.route('/')
  .post(controller.create)
  .get(controller.list)

router.get('/pending', controller.listPending)

router.use('/:customerId/counter-logs', controller.getById, counterLogRouter)

router.route('/:customerId/issues')
  .get(controller.getById, controller.listIssues)
  .post(controller.getById, controller.createIssue)

exports.router = router