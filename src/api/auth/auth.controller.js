const authService = require('./auth.service')


exports.login = async (req, res) => {
  try {
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
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'error to save'
    })
  }
}
