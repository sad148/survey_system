var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var md5 = require('md5')
MongoClient.connect(url, function (err, db) {
    let password = "survey_admin"
    if (err) throw err;
    var dbo = db.db("survey_system");
    var myobj = {
        "username": "admin",
        "password": md5(password),
        "first_name": "Admin",
        "last_name": "",
        "email": "admin",
        "user_id": "b8451d86431311e8842f0ed5f89f718b"
    }
    dbo.collection("users").update({user_id: "b8451d86431311e8842f0ed5f89f718b"}, {'$set': myobj}, {upsert: true}, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        process.exit();
    })
});

