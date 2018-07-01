const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var login = require('./login.js');
var swig = require('swig');
var fs = require('fs');
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
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let hostname = process.env.hostname || "localhost";
let port = process.env.port || 27017;
let dbName = process.env.dbname || "survey_system";
const writeLogs = require('./models/writeLogs').writeLogs;
const moment = require('moment')
const url = `mongodb://${hostname}:${port}`;

var client;
var db;

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
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    login.login(req, db, (response) => {
        console.log("method", req.method)
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        res.send(response)
    })
})

app.post('/registerUser', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    registerUser.registerUser(req, db, (response) => {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        res.send(response);
    })
})

app.get('/tuq', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers})
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
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, response: {code: 200, data: tuqData}});
        res.send({code: 200, data: tuqData})
    } else {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, response: {code: 204, data: []}});
        res.send({code: 204, data: []})
    }
})

app.get('/muq/:type', (req, res) => {
    let route = req.route.path
    let method = req.method  
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, params: req.params})
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
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, params: req.params, response: {code: 200, data: muqData}});
        res.send({code: 200, data: muqData})
    } else {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, params: req.params, response: {code: 204, data: []}});
        res.send({code: 204, data: []})
    }
})

app.get('/demographic', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers})
    writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, data:{
        code: 200,
        data: data.demoQuestions
    }})

    res.send({
        code: 200,
        data: data.demoQuestions
    })
})


app.post('/createproject', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    createproject.createproject(req, db, (response) => {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        res.send(response)
    })
})

app.post('/getprojectslist', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    getprojectslist.getprojectslist(req, db, (response) => {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        res.send(response);
    })
})

app.post('/getprojectquestions', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    getprojectquestions.getprojectquestions(req, db, (response) => {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        res.send(response)
    })
})

app.post('/exportcsv', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    exportcsv.exportcsv(req, db, (response) => {
        if(response.code !== 200)
            writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        else
            writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: "Exported successfully"});
        res.send(response)
    })
})

app.post('/exportspss', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body,  response:"Response is not logged purposely"})
    exportspss.exportspss(req, db, (response) => {
        if(response.code !== 200)
            writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        else
            writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: "Exported successfully"});
        res.send(response)
    })
})

app.post('/submitanswers', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    submitAnswers.submitAnswers(req, db, (response) => {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        res.send(response)
    })
})

app.get('/download/:fileName', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, params: req.params})
    let fileName = req.params.fileName
    let path = __dirname.substring(0, __dirname.lastIndexOf('\\'));
    path += `\\exports\\${fileName}`
    fs.access(path, (err) => {
        if (err) {
            writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response:{
                code: 400,
                message: "Error in downloading"
            } });
            res.send({
                code: 400,
                message: "Error in downloading"
            })
        } else {
            writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: {path: path, fileName: fileName}});
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
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    getUserDetails.getUserDetails(req, db, (response) => {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        res.send(response)
    })
})
app.post('/updatepassword', (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body})
    updatePassword.updatePassword(req, db, (response) => {
        writeLogs("Response", {route: route, method: method,timestamp: moment().format(), headers: req.headers, payload: req.body, response: response});
        res.send(response)
    })
})

app.get("/metadata", (req, res) => {
    let route = req.route.path
    let method = req.method
    writeLogs("Request", {route: route, method: method,timestamp: moment().format(), headers: req.headers, response:"Response is not logged purposely"})
    let metadata = {}
    metadata.countries = require('./models/countries').countries()
    metadata.positions = require('./models/position').positions()
    metadata.roles = require('./models/roles').role()
    res.send(metadata)
})