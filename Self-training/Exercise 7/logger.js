const EventEmitter = require('events');

class Logger extends EventEmitter{
    printMessage(message){
        console.log(message);

        this.emit('messageSent', {id: 1, name: 'Muhammad Raka Zuhdi Harypradana'});
    }
}

module.exports = Logger;