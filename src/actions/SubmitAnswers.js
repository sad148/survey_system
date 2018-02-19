var request = require('superagent');

function submitAnswers(data, cb) {
    let apiUrl = 'http://localhost:3009/'
    request
        .post(apiUrl + 'submitanswers')
        .set('Content-Type', 'application/json')
        .send({data: data})
        .end((err, res) => {
            if (err) {
                console.log("Error", err);
            }
            else {
                if (res.body.code == 200) {
                    cb(res.body)
                }
                else {
                    cb(res.body)
                }
            }
        })
}

module.exports.submitAnswers = submitAnswers