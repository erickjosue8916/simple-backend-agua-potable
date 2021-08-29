const jwt = require('jsonwebtoken')

exports.encodeToken = ({jwtConfig, payload}) => {
  const { secretKey, duration } = jwtConfig
  const token = jwt.sign(payload, secretKey, { expiresIn: Number(duration) });
  return token
}

exports.decodeToken = async ({jwtConfig, token}) => {
  const { secretKey } = jwtConfig
  try {
    const payload = jwt.verify(token, secretKey)
    return payload
  } catch (error) {
    console.log(error)
    return null
  }
}