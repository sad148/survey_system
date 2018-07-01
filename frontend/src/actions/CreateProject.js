var request = require('superagent');

function createProject(data, cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    let userid = sessionStorage.getItem("userid");
    request
        .post(apiUrl + 'createproject')
        .set('Content-Type', 'application/json')
        .send({data: data, userid: userid})
        .end((err, res) => {
            if (err) {
                alert("Error in creating project")
                console.log("Error", err);
            }
            else {
                cb(res.body)
            }
        })
}

module.exports.createProject = createProject