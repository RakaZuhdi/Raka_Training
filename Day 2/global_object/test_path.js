const path = require('path');
const logger = require('./logger.js');

var pathObject = path.parse(__filename);

console.log(pathObject);