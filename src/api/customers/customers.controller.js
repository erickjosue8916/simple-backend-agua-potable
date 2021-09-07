const customerService = require('./customer.service')

const issuesService = require('../issues/issues.service')
const response = require('../../utils/response')
const usersService = require('../users/users.service')

const createCustomerUserPayload = ({customer, id}) => {
  return {
    'name': customer.firstName,
    'lastName': customer.lastName,
    'dui': id,
    'username': id,
    'password': id,
    'type': 'CUSTOMER',
    'bithDate': customer.birthDate || ``
}
}

exports.list = async (req, res) => {
  try {
    const result = await customerService.list()
    return res.status(201).json(result)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}

exports.listPending = async (req, res) => {
  try {
    const result = await customerService.listPending()
    return res.json({data: result})
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}
exports.create = async (req, res) => {
  try {
    const {id, payload} = await customerService.createPayloadForNew(req.body)
    
    const customer = await customerService.create(id, payload)
    const userPayload = createCustomerUserPayload({customer: payload, id})
    const user = await usersService.create(userPayload)
    return res.json({
      id,
      ...userPayload
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}

exports.createIssue = async (req, res) => {
  const {customer, body} = req
  const result = await issuesService.create({
    customerId: customer.id,
    description: body.description
  })
  res.status(201).json()
}

exports.listIssues = async (req, res) => {
  const {customer} = req
  const result = await issuesService.getIssuesByCustomerId(customer.id)
  res.status(201).json(result)
}

exports.getById = async (req, res, next) =>  {
  try {
    const { customerId } = req.params
    const customer = await customerService.getCustomerById(customerId)
    req.customer = customer
    next()
  } catch (error) {
    return res.status(404).json({
      error
    })
  }
}