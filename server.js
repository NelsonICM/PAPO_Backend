const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const connectDB = require('./backend/config/db')
const { errorHandler } = require('./backend/middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()

const app = express()

// Middlewares
app.use(cors({ origin: 'http://localhost:5000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/movies', require('./backend/routes/movieRoutes'))
app.use('/api/users', require('./backend/routes/userRoutes'))
app.use('/api/contact', require('./backend/routes/contactRoutes'))

// Servir Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
  })
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`.yellow.bold)
})