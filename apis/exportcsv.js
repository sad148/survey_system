var _ = require('lodash/includes')
var json2csv = require('json2csv');
var fs = require('fs');
var optionsMapping = require('./models/optionsMapping');

function exportcsv(req, db, cb) {
    let projectId = req.body.projectId;
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
                            answer: '$answer'
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
            let columnNames = [];
            let rows = [];
            let objMapping = {}
            columnNames[0] = "userId";
            for (let i = 0; i < res.length; i++) {
                let userId = res[i]._id.userId
                rows[i] = {}
                rows[i].userId = userId;
                for (let j = 0; j < res[i].answer.length; j++) {
                    let question = res[i].answer[j].question;
                    let answer = res[i].answer[j].answer;
                    if(!isNaN(answer)) {
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
            fs.writeFile('export.csv', csv, function (err, res) {
                if (err) {
                    console.log(err);
                    cb({
                        code: 400,
                        message: "Error in exporting"
                    })
                } else {
                    cb({
                        code: 200,
                        message: "Success"
                    })
                }
            })
        }
    })
}

module.exports.exportcsv = exportcsv;