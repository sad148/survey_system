var request = require('superagent');

function getTUQ(cb) {
    //let apiUrl = sessionStorage.getItem('apiurl');
    let apiUrl = 'http://localhost:3009/'
    request
        .get(apiUrl + 'muq')
        .set('Content-Type', 'application/json')
        .end((err,res) => {
            if(err) {
                console.log("Error",err);
            }
            else {
                cb(res.body.data)
            }
        })
}

module.exports.gettuq = getTUQ;