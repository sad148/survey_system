var request = require('superagent');

function getDemographic(cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    let userid = sessionStorage.getItem("userid");
    let username = sessionStorage.getItem("username");
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