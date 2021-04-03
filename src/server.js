const express = require('express')
const server = express()
const routes = require('./routes')

// use template engine EJS
server.set('view engine', 'ejs')

// import static files
server.use(express.static('public'))

// use req.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

server.listen(3333, () => console.log("Server is running on port 3333..."))