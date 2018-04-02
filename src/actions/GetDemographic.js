var request = require('superagent');

function getDemographic(cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    request
        .get(apiUrl + 'demographic')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err) {
                alert("Error in retrieving demographic questions")
                cb([])
                console.log("Error", err);
            }
            else {
                cb(res.body.data)
            }
        })
}

module.exports.getdemographic = getDemographic;