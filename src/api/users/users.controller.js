const usersService = require('./users.service')
const response = require('../../utils/response')

exports.list = async (req, res) => {
  try {
    const { user } = req
    
    if (user.type != `ADMIN`) {
      return response.forbidden(res)
    }
    const result = await usersService.list()
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}

exports.create = async (req, res) => {
  try {
    const { user } = req
    
    if (user.type != `ADMIN`) {
      return response.forbidden(res)
    }
    const result = await usersService.create(req.body)
    delete req.body.password
    return res.status('201').json({
      id: result._path.segments[1],
      ...req.body
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
    const { user } = req
    
    if (user.type != `ADMIN`) {
      return response.forbidden(res)
    }
    const { userId } = req.params
    const _user = await usersService.getCustomerById(userId)
    req.user = _user
    next()
  } catch (error) {
    return res.status(404).json({
      error
    })
  }
}