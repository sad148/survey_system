var request = require('superagent');

function submitAnswers(data, cb) {
    //let apiUrl = sessionStorage.getItem("apiurl");
    let apiUrl = "http://localhost:3009/"
    request
        .post(apiUrl + 'submitanswers')
        .set('Content-Type', 'application/json')
        .send({data: data})
        .end((err, res) => {
            if (err) {
                alert("Error in submitting answer")
                console.log("Error", err);
            }
            else {
                if (res.body.code == 200) {
                    cb(res.body)
                }
                else {
                    alert(res.body.message)
                }
            }
        })
}

module.exports.submitAnswers = submitAnswers