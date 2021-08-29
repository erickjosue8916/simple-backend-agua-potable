const authService = require('./auth.service')
const { config } = require('../../config')
const { encodeToken } = require('../../utils/jwt')

exports.login = async (req, res) => {
  try {
    const jwtConfig = config.jwt
    const { username, password, type } = req.body

    if (!username) return res.status(400).json({error: "username is required"})
    if (!password) return res.status(400).json({error: "password is required"})
    if (!type) return res.status(400).json({error: "type is required"})

    const [user] = await authService.login(username, password, type)

    if (!user) {
      return res.status(401).json({
        error: 'invalid credentials'
      })
    }
    const accessToken = encodeToken({jwtConfig, payload: user})
    const result = {
      ...user,
      access_token: accessToken
    }
    return res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}
