var request = require('superagent');

function getregistermetadata(cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    request
        .get(apiUrl + 'metadata')
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

module.exports.getregistermetadata = getregistermetadata;