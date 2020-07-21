function DiplayLog(){
    console.log('This message is from logger');
}

function DisplayLogCustom(argument){
    console.log(argument);
}

module.exports.displayLog = DiplayLog;
module.exports.customLog = DisplayLogCustom;