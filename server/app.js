var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var apiRouter = require('./routes/api');

express()
  .set('x-powered-by', false)
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use('/api/v1', apiRouter)
  .listen(3000, () => console.info(`Server is up and running on port ${3000}`));