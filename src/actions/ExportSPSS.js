var request = require('superagent');

function exportspss(projectId, cb) {
    let apiUrl = 'http://localhost:3009/'
    request
        .post(apiUrl + 'exportspss')
        .send({projectId: projectId})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err) {
                alert("Error in exporting spss")
                console.log("Error", err);
            }
            else {
                cb(res.body)
            }
        })
}

module.exports.exportspss = exportspss;