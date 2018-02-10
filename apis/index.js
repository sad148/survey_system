const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var login = require('./login.js');
var swig = require('swig');
var fs = require('fs');
var registerUser = require('./registerUser.js');
var data = require('./models/demographic.js')
var createproject = require('./createproject')
var getprojectslist = require('./getprojectslist');
var getprojectquestions = require('./getprojectquestions');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'survey_system';
//const connection = "";
var client;
var db;
app.use(bodyParser.json());
app.use(cors())
app.listen(3009,() => {
    console.log("Listening on 3009");
    // connection = mysql.createConnection({
    //     host     : 'localhost',
    //     user     : 'survey_system',
    //     password : 'root',
    //     database : 'survey_system'
    // });
    // connection.connect();
    MongoClient.connect(url, function(err, response) {
        client = response
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db = client.db(dbName);
    });
    // module.exports = {connection:connection};
})



app.post('/login', (req, res) => {
    login.login(req, db, (response) => {
        res.send(response)
    })
})

app.post('/registerUser', (req, res) => {
    registerUser.registerUser(req, db, (response) => {
        res.send(response);
    })
})

app.get('/tuq', (req, res) => {
    let template = swig.compileFile(__dirname + '/models/tuq.json');
    let tuqData = []
    tuqData = template({
        variable: 'web application'
    });

    tuqData = tuqData.split('\n');
    for(let  i = 0; i < tuqData.length; i++) {
        tuqData[i] = tuqData[i].toString();
        tuqData[i] = JSON.parse(tuqData[i]);
    }

    if(tuqData.length > 0) {
        res.send({code:200, data:tuqData})
    } else {
        res.send({code:204, data: []})
    }
})

app.get('/muq', (req, res) => {
    let template = swig.compileFile(__dirname + '/models/muq.json');
    let muqData = []
    muqData = template({
        variable: 'mobile application'
    });

    muqData = muqData.split('\n');
    for(let  i = 0; i < muqData.length; i++) {
        muqData[i] = muqData[i].toString();
        muqData[i] = JSON.parse(muqData[i]);
    }

    if(muqData.length > 0) {
        res.send({code:200, data:muqData})
    } else {
        res.send({code:204, data: []})
    }
})

app.get('/demographic', (req, res) => {
    res.send({
        code:200,
        data:data.demoQuestions
    })
})


app.post('/createproject', (req, res) => {
    createproject.createproject(req, db, (response) => {
        res.send(response)
    })
})

app.post('/getprojectslist', (req, res) => {
    getprojectslist.getprojectslist(req, db, (response) => {
        res.send(response);
    })
})

app.post('/getprojectquestions', (req, res) => {
    getprojectquestions.getprojectquestions(req, db, (response) => {
        res.send(response)
    })
})