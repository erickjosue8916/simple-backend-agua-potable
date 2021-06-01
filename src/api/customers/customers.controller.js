const customerService = require('./customer.service')

const issuesService = require('../issues/issues.service')

exports.list = async (req, res) => {
  try {
    const result = await customerService.list()
    return res.json(result)
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
    const result = await customerService.create(id, payload)
    return res.json(result)
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