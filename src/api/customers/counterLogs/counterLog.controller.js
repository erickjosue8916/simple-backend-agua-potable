const counterLogService = require('./counterLog.service')

exports.list = async (req, res) => {
  try {
    const { customer }= req
    if (!customer) {
      return res.status(404).json({
        error: 'customer not found'
      })
    }
    console.log(customer)
    const result = await counterLogService.list({customer})
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
    const { customer, body: data }= req
    if (!customer) {
      return res.status(404).json({
        error: 'customer not found'
      })
    }
    const result = await counterLogService.create({customer, data})
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}