const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var login = require('./login.js');
var swig = require('swig');
var fs = require('fs');
var path = require('path')
var rfs = require('rotating-file-stream')
var registerUser = require('./registerUser.js');
var data = require('./models/demographic.js')
var createproject = require('./createproject')
var getprojectslist = require('./getprojectslist');
var getprojectquestions = require('./getprojectquestions');
var exportcsv = require('./exportcsv');
var exportspss = require('./exportspss');
var submitAnswers = require('./submitAnswers')
var validateEmail = require('./validateemail')
var getUserDetails = require('./getUserDetails')
var updatePassword = require('./updatePassword')
var morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let hostname = process.env.hostname || "localhost";
let port = process.env.port || 27017;
let dbName = process.env.dbname || "survey_system";
console.log(hostname, port, dbName)
const url = `mongodb://${hostname}:${port}`;

var client;
var db;
var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))
app.use(bodyParser.json());
app.use(cors())

app.listen(3009, () => {
    console.log("Listening on 3009");
    MongoClient.connect(url, function (err, response) {
        client = response
        console.log("mongo error", err);
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db = client.db(dbName);
    });
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
    for (let i = 0; i < tuqData.length; i++) {
        tuqData[i] = tuqData[i].toString();
        tuqData[i] = JSON.parse(tuqData[i]);
    }

    if (tuqData.length > 0) {
        res.send({code: 200, data: tuqData})
    } else {
        res.send({code: 204, data: []})
    }
})

app.get('/muq/:type', (req, res) => {
    let template;
    let type = parseInt(req.params.type)
    switch (type) {
        case 2:
            template = swig.compileFile(__dirname + '/models/mauq1.json');
            break;
        case 3:
            template = swig.compileFile(__dirname + '/models/mauq2.json');
            break;
        case 4:
            template = swig.compileFile(__dirname + '/models/mauq3.json');
            break;
        case 5:
            template = swig.compileFile(__dirname + '/models/mauq4.json');
            break;
    }
    muqData = template({
        variable: 'mobile application'
    });
    muqData = muqData.split('\n');
    for (let i = 0; i < muqData.length; i++) {
        muqData[i] = muqData[i].toString();
        muqData[i] = JSON.parse(muqData[i]);
    }

    if (muqData.length > 0) {
        res.send({code: 200, data: muqData})
    } else {
        res.send({code: 204, data: []})
    }
})

app.get('/demographic', (req, res) => {
    res.send({
        code: 200,
        data: data.demoQuestions
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

app.post('/exportcsv', (req, res) => {
    exportcsv.exportcsv(req, db, (response) => {
        res.send(response)
    })
})

app.post('/exportspss', (req, res) => {
    exportspss.exportspss(req, db, (response) => {
        res.send(response)
    })
})

app.post('/submitanswers', (req, res) => {
    submitAnswers.submitAnswers(req, db, (response) => {
        res.send(response)
    })
})

app.get('/download/:fileName', (req, res) => {
    let fileName = req.params.fileName
    let path = __dirname.substring(0, __dirname.lastIndexOf('/'));
    path += `/exports/${fileName}`
    fs.access(path, (err) => {
        if (err) {
            console.log(path);
            res.send({
                code: 400,
                message: "Error in downloading"
            })
        } else {
            res.download(path, fileName);
        }
    })
})

app.post('/validateemail', (req, res) => {
    validateEmail.validateemail(req, db, (response) => {
        res.send(response)
    })
})

app.post('/getuserdetails', (req, res) => {
    getUserDetails.getUserDetails(req, db, (response) => {
        res.send(response)
    })
})
app.post('/updatepassword', (req, res) => {
    updatePassword.updatePassword(req, db, (response) => {
        res.send(response)
    })
})

app.get("/metadata", (req, res) => {
    let metadata = {}
    metadata.countries = require('./models/countries').countries()
    metadata.positions = require('./models/position').positions()
    metadata.roles = require('./models/roles').role()
    res.send(metadata)
})