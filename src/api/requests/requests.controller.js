const requestsService = require('./requests.service')

const response = require('../../utils/response')

const createCustomerUserPayload = ({customer, id}) => {
  return {
    'name': customer.firstName,
    'lastName': customer.lastName,
    'dui': id,
    'username': customer.username || id,
    'password': customer.username || id,
    'type': 'CUSTOMER',
    'bithDate': customer.birthDate || ``
}
}

exports.list = async (req, res) => {
  try {
    const result = await requestsService.list()
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
    const result = await requestsService.listPending()
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
    const {id, payload} = await requestsService.createPayloadForNew(req.body)
    
    const request = await requestsService.create(id, payload)
    
    return res.json({
      id, ...payload
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}

exports.getById = async (req, res, next) =>  {
  try {
    const { requestId } = req.params
    const request = await requestsService.getCustomerById(requestId)
    req.request = request
    next()
  } catch (error) {
    return res.status(404).json({
      error
    })
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    const {request} = req
    const {status} = req.params

    if (![`approved`, `deleted`].includes(status)) {
      return response.badRequest(res, `Invalid update status`)
    }
    const result = await requestsService.updateStatus(request.dui, status)

    req.body = request
    return next()
  } catch (error) {
    return response.badRequest(res, `Server Error`)
  }
}