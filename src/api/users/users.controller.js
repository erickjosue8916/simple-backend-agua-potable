const usersService = require('./users.service')


exports.list = async (req, res) => {
  try {
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
    const result = await usersService.create(req.body)
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
    const { userId } = req.params
    const user = await usersService.getCustomerById(userId)
    req.user = user
    next()
  } catch (error) {
    return res.status(404).json({
      error
    })
  }
}