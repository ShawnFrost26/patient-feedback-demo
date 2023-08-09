const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')


const feedbackRoutes = require('./routes/combinedData.route')

const app = express()

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Reroute all API request starting with "/" route
app.use('/v1', feedbackRoutes)

module.exports = app