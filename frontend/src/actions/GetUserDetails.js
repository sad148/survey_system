var request = require('superagent');

function getuserdetails(email, cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    let userid = sessionStorage.getItem("userid");
    request
        .post(apiUrl + 'getuserdetails')
        .set('Content-Type', 'application/json')
        .send({email: email, userid: userid})
        .end((err, res) => {
            if (err) {
                alert("Error in getting user details")
            }
            else {
                if (res.body.code == 200) {
                    cb({
                        data: res.body.data
                    })
                }
                else {
                    alert("Error in getting user details")
                }
            }
        })
}

module.exports.getuserdetails = getuserdetails;