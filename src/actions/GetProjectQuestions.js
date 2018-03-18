var request = require('superagent');

function getProjectQuestions(projectId, cb) {
    //let apiUrl = sessionStorage.getItem('apiurl');
    let apiUrl = 'http://localhost:3009/'
    request
        .post(apiUrl + 'getprojectquestions')
        .send({projectId:projectId})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err) {
                console.log("Error", err);
            }
            else {
                cb(res.body.data)
            }
        })
}

module.exports.getProjectQuestions = getProjectQuestions;