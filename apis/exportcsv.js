var _ = require('lodash/includes')
var uniq = require('lodash/uniq');
var json2csv = require('json2csv');
var fs = require('fs');
var optionsMapping = require('./models/optionsMapping');

function exportcsv(req, db, cb) {
    let projectId = req.body.projectId;
    //get questions of a survey
    let questionsData = db.collection(`${projectId}::details`).find();
    questionsData.toArray(function (err, res) {
        if (res.length == 0) {
            cb({
                code: 204,
                message: "Error in exporting csv"
            })
        } else {
            let columns = [];
            let questionIdArr = [];
            let questionIdColumnMapping = {}
            let rows = [];
            let counter = 0;
            rows[0] = {};
            res.map((item) => {
                //since checkbox will have multiple options to choose from, separate columns should be created
                //to check if the question type is not checkbox
                if (item.type !== "checkbox") {
                    columns.push(`Q${counter}`);
                    if (!questionIdColumnMapping[item.questionId])
                        questionIdColumnMapping[item.questionId] = []

                    questionIdColumnMapping[item.questionId].push({
                        csvColumnName: `Q${counter}`,
                        type: item.type
                    })
                    rows[0][`Q${counter}`] = item.question
                    counter++;
                } else {    //for questions which are of checkbox type
                    for (let i = 0; i < item.options.length; i++) {
                        if (item.options[i] !== null) {
                            columns.push(`Q${counter}_${i}`);
                            if (!questionIdColumnMapping[item.questionId])
                                questionIdColumnMapping[item.questionId] = []

                            //otherColumnName key is used to concatenate question name and option which is later split and value is mapped to the particular question
                            //please check mapAnswerToQues for clear understanding
                            questionIdColumnMapping[item.questionId].push({
                                csvColumnName: `Q${counter}_${i}`,
                                otherColumnName: `Q${counter}_${item.options[i]}`,
                                type: item.type
                            })
                            rows[0][`Q${counter}_${i}`] = `${item.question}_${item.options[i]}`
                            counter++;
                        }
                    }
                }
            })
            //get answers submitted by all users for the particular survey
            let data = db.collection(`${projectId}::answers`);
            data.aggregate(
                [{
                    "$match": {
                        "userId": {
                            "$ne": null
                        }
                    }
                },
                    {
                        "$group": {
                            "_id": {
                                "userId": "$userId",
                                "submittedEpoch": "$submittedEpoch"
                            },
                            answer: {
                                $push: {
                                    question: '$question',
                                    answer: '$answer',
                                    questionId: '$id'
                                }
                            },
                        }
                    },

                ]
            )
                .toArray(function (err, res) {
                    if (res.length == 0) {
                        cb({
                            code: 204,
                            message: "No answers submitted yet"
                        })
                    } else {
                        //answers are grouped on userId and submittedEpoch(time stamp) basis to maintain uniqueness
                        //traversing through the data received for submitted answers
                        for (let i = 0; i < res.length; i++) {
                            rows[i + 1] = {}
                            let answers = res[i].answer;
                            let obj = {}
                            for (let k = 0; k < answers.length; k++) {
                                obj[answers[k].questionId] = answers[k].answer
                            }
                            for (let item in questionIdColumnMapping) {
                                mapAnswerToQues(obj, rows[i + 1], item, questionIdColumnMapping[item])
                            }
                        }
                        let records = []
                        for (let i = 0; i < rows.length; i++) {
                            let rowsData = Object.values(rows[i])
                            records[i] = rowsData
                        }

                        let csv = json2csv({data: rows, field: columns})
                        csv = csv.split("\r")
                        columns = csv[0];
                        fs.writeFile("export.csv", csv, function (err, res) {
                            if (err) {
                                cb({
                                    code: 400,
                                    message: "Error in exporting csv"
                                })
                            } else {
                                cb({
                                    code: 200,
                                    message: "Success",
                                    data: csv
                                })
                            }
                        })

                    }
                })
        }
    })
}

function mapAnswerToQues(obj, row, questionId, questionIdColumnMapping) {
    //getting object mapping for options of a specific questionId
    let values = questionIdColumnMapping
    let type = values[0].type
    if (obj[questionId]) {
        for (let z = 0; z < values.length; z++) {
            if (type === "checkbox") {
                //split the otherColumnName to get option name and map it with answer submitted by user
                let columnSplit = values[z].otherColumnName.split('_');
                if (obj[questionId] == columnSplit[1]) {
                    //set value for combination of question number and option to 1 if the user has selected this option
                    row[values[z].csvColumnName] = 1;
                } else {
                    //set value for combination of question number and option to 0 if the user has not selected this option
                    row[values[z].csvColumnName] = 0;
                }
            } else {
                //set the selected value or entered text directly to the question number
                row[values[z].csvColumnName] = optionsMapping.optionsMapping(obj[questionId])
            }
        }
    } else {
        for (let z = 0; z < values.length; z++) {
            //set value for combination of question number and option to 0 if the user has not answered this question
            row[values[z].csvColumnName] = 0;
        }
    }
}

module.exports.exportcsv = exportcsv;