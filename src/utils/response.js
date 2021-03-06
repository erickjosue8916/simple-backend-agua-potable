const getStatusCode = (status, name) => {
  return {
    status, name
  }
}

const httpStatus = {
  unauthorized: getStatusCode(401, `UNAUTHORIZED`),
  forbidden: getStatusCode(403, `FORBIDDEN`),
  success: getStatusCode(200, `SUCCESS`),
  created: getStatusCode(201, `CREATED`),
  serverError: getStatusCode(500, `SERVER ERROR`),
  badRequest: getStatusCode(400, `BAD REQUEST`),
}

const error = (res, httpStatus, message) => {
  return res.status(httpStatus.status).json({
    ...httpStatus,
    error: message
  })
}

exports.unauthorized = (res, message) => {
  return error(res, httpStatus.unauthorized, message)
}

exports.forbidden = (res, message = `You do not have access to this resource`) => {
  return error(res, httpStatus.forbidden, message)
}

exports.badRequest = (res, message = `You request is invalid`) => {
  return error(res, httpStatus.badRequest, message)
}

exports.success = (res, data) => {
  return res.status(httpStatus.success.status).json(data)
}