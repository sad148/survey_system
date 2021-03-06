var moment = require('moment');

function submitAnswers(req, db, cb) {
    let answers = req.body.data.answers;
    let surveyId = req.body.data.surveyId;
    let submittedTime = moment().format();
    let submittedEpoch = new Date().getTime();
    if (answers.length === 0) {
        answers[0] = {
            submittedTime: submittedTime,
            submittedEpoch: submittedEpoch
        }
    }
    else {
        for (let i = 0; i < answers.length; i++) {
            answers[i].submittedTime = submittedTime
            answers[i].submittedEpoch = submittedEpoch
        }
    }
    const data = db.collection('projects');
    db.createCollection(surveyId + "::answers", {autoIndexId: false})
        .then((res) => {
            db.collection(surveyId + "::answers").insertMany(answers)
                .then((res) => {
                    data.findOne({projectId: surveyId})
                        .then((projectDetails) => {
                            data.findOneAndUpdate({
                                projectId: surveyId
                            }, {
                                $set: {
                                    response: !projectDetails.response ? 1 : parseInt(projectDetails.response) + 1,
                                    latestDateEntry: submittedTime
                                }
                            }, {
                                returnOriginal: false,
                                upsert: true
                            })
                                .then((success) => {
                                    cb({
                                        code: 200,
                                        message: "Answers submitted successfully"
                                    })
                                })
                                .catch((err) => {
                                    cb({
                                        code: 400,
                                        message: "Error in submitting answers",
                                        err: err
                                    })
                                })
                        })
                        .catch((err) => {
                            cb({
                                code: 400,
                                message: "Error in submitting answers",
                                err: err
                            })
                        })
                })
                .catch((err) => {
                    cb({
                        code: 400,
                        message: "Error in submitting answers",
                        err: err
                    })
                })
        })
        .catch((err) => {
            cb({
                code: 400,
                message: "Error in submitting answers",
                err: err
            })
        })
}

module.exports.submitAnswers = submitAnswers;