require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// require routes
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

// routes
app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)

// connect to database
mongoose.connect(process.env.URI)
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log("connected to database & listening on port",process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })