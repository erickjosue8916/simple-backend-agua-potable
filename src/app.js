const express = require('express')
const cors = require('cors')
const {config} = require('./config')
const dotenv = require('dotenv')
const {api} = require('./api')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', api)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})