const {Router} = require('express')
const { router: customerRouter } = require('./customers/customers.router')
const { router: usersRouter } = require('./users/users.router')
const { router: authRouter } = require('./auth/auth.router')
const { router: issuesRouter } = require('./issues/issues.router')
const { router: requestRouter } = require('./requests/requests.router')

const router = Router()

router.use('/customers', customerRouter)
router.use('/users', usersRouter)
router.use('/auth', authRouter)
router.use('/issues', issuesRouter)
router.use('/requests', requestRouter)

exports.api = router