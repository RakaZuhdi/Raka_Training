const fileSystem = require('fs');


//Synchronized
var file = fileSystem.readdirSync('C:/Users/Raka Zuhdi/Desktop/My-node-js/Raka_Training');
console.log('Files in this folder are (Synchronized): \n');
console.log(file);

//Non-synchronized
var fileAsynchronus = fileSystem.readdir('C:/Users/Raka Zuhdi/Desktop/My-node-js/Raka_Training', function(err, files){
    if(err){
        console.log("Error occured. Error messages: " + err);
    }else{
        console.log("Files located in this folder are (Asynchronized): " + files);
    }
});