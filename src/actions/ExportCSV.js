var request = require('superagent');

function exportcsv(projectId, cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    request
        .post(apiUrl + 'exportcsv')
        .send({projectId: projectId})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err) {
                alert("Error in exporting csv")
                console.log("Error", err);
            }
            else {
                cb(res.body)
            }
        })
}

module.exports.exportcsv = exportcsv;