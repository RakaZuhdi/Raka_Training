const  EventEmitter = require('events');

class Logger extends EventEmitter{
    log(){
        console.log('This message is from logger class');

        this.emit('messageLogged', {id: 2, name: 'Raka Zuhdi', age: 18});
    }
}

module.exports  = Logger;