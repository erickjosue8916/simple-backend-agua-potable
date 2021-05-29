const {Router} = require('express')
const { router: customerRouter } = require('./customers/customers.router')
const { router: issuesRouter } = require('./issues/issues.router')

const router = Router()

router.use('/customers', customerRouter)
router.use('/issues', issuesRouter)

exports.api = router