var message = "message ini bukan global. Hanya berjalan di node ini saja.";
console.log(message);


const logger = require("./logger"); //Import dari logger.js, menggunakan const agar tidak sengaja terganti


logger.log("Message test");
logger.log(logger.Url);