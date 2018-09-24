var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var apiRouter = require('./routes/api');

module.exports = express()
  .set('x-powered-by', false)
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use('/api', apiRouter)
  .listen(process.env.PORT, () => console.info(`Server is up and running on port ${process.env.PORT}`));