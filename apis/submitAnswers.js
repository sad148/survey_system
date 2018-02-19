function submitAnswers(req, db, cb) {
    let answers = req.body.data.answers;
    let surveyId = req.body.data.surveyId;

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