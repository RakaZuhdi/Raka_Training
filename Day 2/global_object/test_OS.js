const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total memory: ' + totalMemory);
console.log('Free memory: ' + freeMemory);

//ES6
console.log(`Total memory: ${totalMemory}`);


