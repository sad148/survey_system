var request = require('superagent');

function updatePassword(email, password, cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    request
        .post(apiUrl + 'updatepassword')
        .set('Content-Type', 'application/json')
        .send({email: email, password: password})
        .end((err, res) => {
            if (err) {
                alert("Error in updating password")
            }
            else {
                if (res.body.code == 200) {
                    cb({
                        message: res.body.message
                    })
                }
                else {
                    alert("Error in updating password")
                }
            }
        })
}

module.exports.updatePassword = updatePassword;