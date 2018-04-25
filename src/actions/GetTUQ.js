var request = require('superagent');

function getTUQ(cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    request
        .get(apiUrl + 'tuq')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err) {
                alert("Error in retrieving TUQ questions")
                cb([]);
            }
            else {
                cb(res.body.data)
            }
        })
}

module.exports.gettuq = getTUQ;