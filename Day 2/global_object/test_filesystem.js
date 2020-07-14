const fs = require('fs');

var file = fs.readdirSync('./'); // Read file in directory
console.log(file);

var fileAsynchronus = fs.readdir('./x', function(err, files){
    if(err){
        console.log("Error occured. Error Message: " + err);
    }else{
        console.log("Files in this directory are: " + files)
    }
});

