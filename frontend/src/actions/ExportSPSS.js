var request = require('superagent');

function exportspss(projectId, cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    let userid = sessionStorage.getItem("userid");
    request
        .post(apiUrl + 'exportspss')
        .send({projectId: projectId, userid: userid})
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