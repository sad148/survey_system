var request = require('superagent');

function exportcsv(projectId, cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    let userid = sessionStorage.getItem("userid");
    request
        .post(apiUrl + 'exportcsv')
        .send({projectId: projectId, userid: userid})
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