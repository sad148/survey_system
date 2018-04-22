const md5 = require('md5');

function getUserDetails(req, db, cb) {
    let data = req.body
    let email = data.email;
    db.collection('users').findOne({email: email}, {
        securityQuestion1: true,
        securityQuestion2: true,
        securityQuestion3: true,
        securityAnswer1: true,
        securityAnswer2: true,
        securityAnswer3: true,
    })
        .then((res) => {
            if (res == null) {
                cb({
                    code: 204,
                    message: "Incorrect email"
                })
            } else {
                let data = {}
                data.securityQuestion1 = res.securityQuestion1;
                data.securityQuestion2 = res.securityQuestion2
                data.securityQuestion3 = res.securityQuestion3
                data.securityAnswer1 = res.securityAnswer1
                data.securityAnswer2 = res.securityAnswer2
                data.securityAnswer3 = res.securityAnswer3
                cb({
                    code: 200,
                    data: data
                })
            }
        })
        .catch((err) => {
            cb({
                code: 400,
                message: "Error in getting user details"
            })
            console.log(err);
        })
}

module.exports.getUserDetails = getUserDetails;