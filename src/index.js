import express from 'express'
import morgan from 'morgan'
import db from './ormConfig'
import userRouter from './routes/user.route'
import photoRouter from './routes/photo.route'
import albumRouter from './routes/album.route'
db.authenticate()
  .then(() => console.log('databse connected'))
  .catch((err) => console.log(err))

const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With , Accept, Authorization, Content-Type')
  // res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, PATCH')
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    return res.status(200).send()
  }
  next()
})

app.use('/users', userRouter)
app.use('/albums', albumRouter)
app.use('/photos', photoRouter)
app.use('/images', express.static('images'))

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
})

app.listen(5000, console.log('Server has started'))
