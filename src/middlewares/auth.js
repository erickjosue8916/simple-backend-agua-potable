const { decodeToken } = require('../utils/jwt')
const { config } = require('../config')
const response = require('../utils/response')

exports.verifyAuthToken = async (req, res, next) => {
  const { authorization } = req.headers
  const jwtConfig = config.jwt

  try {
    if (!authorization) {
      return response.unauthorized(res, `Authorization token is not provided`)
    }
    const [, token] = authorization.split(' ')
    const payload = decodeToken({jwtConfig, token})
    req.user = payload
    next()
  } catch (error) {
    return response.unauthorized(res, `Authorization token is invalid or is expired`)
  }
}