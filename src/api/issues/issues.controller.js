const issuesService = require('./issues.service')

exports.list = async (req, res) => {
  try {
    const result = await issuesService.list()
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}

exports.listUnResolved = async (req, res) => {
  try {
    const result = await issuesService.listUnResolved()
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
    const {id, payload} = await issuesService.createPayloadForNew(req.body)
    const result = await issuesService.create(id, payload)
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}

exports.getById = async (req, res, next) =>  {
  try {
    const { issueId } = req.params
    const issue = await issuesService.getIssueById(issueId)
    req.issue = issue
    next()
  } catch (error) {
    return res.status(404).json({
      error
    })
  }
}