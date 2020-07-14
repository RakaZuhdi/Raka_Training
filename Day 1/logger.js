var url = 'http://mylogger.oi/log';


function DisplayLog(log_message){
    console.log("Log message: " + log_message);
}

//DisplayLog('ini trial pertama menggunakan logger.js app');

function DisplayURL(url){
    console.log('URL Message: ' + url);
}

module.exports.TampilkanURL = DisplayURL;
module.exports.TampilkanLog = DisplayLog;


/*function log(message){
    console.log('log message: ' + message);
}


module.exports.log = log;*/