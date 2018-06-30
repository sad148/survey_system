var request = require('superagent');

function createProject(data, cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    request
        .post(apiUrl + 'createproject')
        .set('Content-Type', 'application/json')
        .send({data: data})
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