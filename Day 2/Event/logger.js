const EventEmitter = require('events');


var url = "http://sguloggingservice.com/log";

class Logger extends EventEmitter{
    log(message){
        // Send an HTTP request
        console.log(message);
    
        // Raise an event
        // emitter.emit('messageLoad', 1, 'http://heberthendrik.com');
        this.emit('messageLogged', {id: 1, url: 'http://heberthendrik.com'} );
    }
}

module.exports = Logger;