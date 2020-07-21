const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', function(args){
    console.log('Listener called', args);
});

logger.log('Ini test messsage dari app.js');