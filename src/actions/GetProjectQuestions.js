var request = require('superagent');

function getProjectQuestions(projectId, cb) {
    //let apiUrl = sessionStorage.getItem('apiurl');
    let apiUrl = 'http://localhost:3009/'
    request
        .post(apiUrl + 'getprojectquestions')
        .send({projectId: projectId})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err) {
                alert("Error in getting project questions")
                console.log("Error", err);
            }
            else {
                if ((res.body.code == 200 && res.body.data.length == 0) || res.body.code == 400) {
                    alert("Error in getting project questions")
                } else
                    cb(res.body.data)
            }
        })
}

module.exports.getProjectQuestions = getProjectQuestions;