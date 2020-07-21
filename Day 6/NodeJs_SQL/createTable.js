var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dummy_database"
});

con.connect(function(err) {
    //try to connect to database object
    if (err){
        console.log('Database error');
        throw err;
    }

    /*console.log("Connected!");
    var sql = "CREATE TABLE customers (Company VARCHAR(255), Highway VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    */
});