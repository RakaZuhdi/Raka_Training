const Logger = require('./logger');
const logger = new Logger();

logger.on('messageSent', function(arg){
    console.log('Listener has been called', arg);
});

logger.printMessage('Ini test message from app.js');