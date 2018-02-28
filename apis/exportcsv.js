var _ = require('lodash/includes')
var json2csv = require('json2csv');
var fs = require('fs');
var optionsMapping = require('./models/optionsMapping');

function exportcsv(req, db, cb) {
    let projectId = req.body.projectId;
    let questionsData = db.collection(`${projectId}::details`).find();
    questionsData.toArray(function (err, res) {
        if (res.length == 0) {
            cb({
                code: 204,
                message: "Error"
            })
        } else {
            let columns = [];
            let rows = [];
            let counter = 0;
            res.map((item) => {
                if (item.stepNum === "step2") {
                    for (let i = 0; i < item.options.length; i++) {
                        columns.push(`Q${counter}_${i}`);
                        rows.push({
                            [`Q${counter}_${i}`]: item.options[i]
                        });
                    }
                } else if (item.type === "checkbox" || item.type === "radio") {
                    for (let i = 0; i < item.options.length; i++) {
                        //console.log(item.options[i]);
                        columns.push(`Q${counter}_${i}`);
                        rows.push({
                            [`Q${counter}_${i}`]: item.options[i]
                        });
                    }
                }
                counter++;
            })
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
                        console.log(rows);
                        let columnNames = [];
                        //let rows = [];
                        let objMapping = {}
                        columnNames[0] = "userId";
                        for (let i = 0; i < res.length; i++) {
                            let userId = res[i]._id.userId
                            rows[i] = {}
                            rows[i].userId = userId;
                            for (let j = 0; j < res[i].answer.length; j++) {
                                //console.log(res[i].answer[j]);
                                let question = res[i].answer[j].question;
                                let answer = res[i].answer[j].answer;
                                if (!isNaN(answer)) {
                                    answer = optionsMapping.optionsMapping(answer);
                                }
                                if (!_(columnNames, question))
                                    columnNames.push(question)
                                if (!rows[i][question]) {
                                    rows[i][question] = []
                                }

                                if (rows[i][question].length > 0) {
                                    rows[i][question] = rows[i][question].split(",");
                                }
                                rows[i][question].push(answer);
                                rows[i][question] = rows[i][question].join(";");
                            }
                        }
                        let csv = json2csv({data: rows, field: columnNames})
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

module.exports.exportcsv = exportcsv;