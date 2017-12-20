const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var login = require('./login.js');
var registerUser = require('./registerUser.js');
app.use(bodyParser.json());
app.use(cors())
app.listen(3009,() => {
    console.log("Listening on 3009");
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'survey_system',
        password : 'root',
        database : 'survey_system'
    });
    connection.connect();
    module.exports.connection = connection;
})

app.post('/login', (req, res) => {
    login.login(req, connection, (response) => {
        res.send(response)
    })
})

app.post('/registerUser', (req, res) => {
    registerUser.registerUser(req, connection, (response) => {
        res.send(response);
    })
})