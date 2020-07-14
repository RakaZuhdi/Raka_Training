var url = "http://sguloginservice.com/log";

function logging(message){
    //Send an HTTP request
    console.log(message);
}

module.exports.log = logging; //Export function log
module.exports.Url = url; //Export var url