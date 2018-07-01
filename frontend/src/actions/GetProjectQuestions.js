var request = require('superagent');

function getProjectQuestions(projectId, cb) {
    //let apiUrl = sessionStorage.getItem("apiurl");
    let apiUrl = "http://localhost:3009/"
    let userid = sessionStorage.getItem("userid");
    request
        .post(apiUrl + 'getprojectquestions')
        .send({projectId: projectId, userid: userid})
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
                    cb(res.body)
            }
        })
}

module.exports.getProjectQuestions = getProjectQuestions;