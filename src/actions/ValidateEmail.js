var request = require('superagent');

function validateemail(email, cb) {
    let apiUrl = sessionStorage.getItem("apiurl");
    request
        .post(apiUrl + 'validateemail')
        .set('Content-Type', 'application/json')
        .send({email: email})
        .end((err, res) => {
            if (err) {
                alert("Error in validating email")
            }
            else {
                if (res.body.code == 200) {
                    cb({
                        validate: res.body.validate
                    })
                }
                else {
                    alert("Error in validating email")
                }
            }
        })
}

module.exports.validateemail = validateemail;