var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("survey_system");
    var myobj = {
        "username": "admin",
        "password": "d0f3a0e129ba85460020433be9bc191a",
        "first_name": "Admin",
        "last_name": "",
        "email": "admin",
        "user_id": "b8451d86431311e8842f0ed5f89f718b"
    }
    dbo.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

