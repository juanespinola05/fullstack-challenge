const express = require('express')
const { port } = require('./config/config')
const { setupRoutes } = require('./controllers')
const cors = require('cors')
const { logErrors, handleSQLError, handleBoomError, handleError } = require('./middlewares/error.handler')

const app = express()
app.use(express.json())

app.use(cors())

setupRoutes(app)

// const include = [
//   'http://localhost:8081'
// ]
// const options = {
//   origin: (origin, callback) => {
//     if (include.includes(origin) || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Unauthorized'))
//     }
//   }
// }

app.get('/', (req, res) => {
  res.send('T-Finanance API')
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

app.use(logErrors)
app.use(handleSQLError)
app.use(handleBoomError)
app.use(handleError)

module.exports = app
