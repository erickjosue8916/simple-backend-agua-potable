const { Router} = require('express')
const controller = require('./requests.controller')
const customerController = require(`../customers/customers.controller`)

const router = Router()

router.route('/')
  .post(controller.create)
  .get(controller.list)

router.use(`/:requestId`, controller.getById)

router.put(`/:requestId/:status`, controller.updateStatus, customerController.create)

router.get('/pending', controller.listPending)


exports.router = router