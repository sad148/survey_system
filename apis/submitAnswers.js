var moment = require('moment');

function submitAnswers(req, db, cb) {
    let answers = req.body.data.answers;
    let surveyId = req.body.data.surveyId;
    let submittedTime = moment().format();
    let submittedEpoch = new Date().getTime();
    for (let i = 0; i < answers.length; i++) {
        answers[i].submittedTime = submittedTime
        answers[i].submittedEpoch = submittedEpoch
    }
    db.createCollection(surveyId + "::answers", {autoIndexId: false})
        .then((res) => {
            db.collection(surveyId + "::answers").insertMany(answers)
                .then((res) => {
                    cb({
                        code: 200,
                        message: "Answers submitted successfully"
                    })
                })
                .catch((err) => {
                    console.log(err);
                    cb({
                        code: 400,
                        message: "Error in submitting answers"
                    })
                })
        })
        .catch((err) => {
            cb({
                code: 400,
                message: "Error in submitting answers"
            })
        })
}

module.exports.submitAnswers = submitAnswers;