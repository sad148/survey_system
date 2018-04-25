const md5 = require('md5');

function updatePassword(req, db, cb) {
    let data = req.body
    let password = md5(data.password);
    let email = data.email
    db.collection("users").updateOne({email: email}, {$set: {password: password}}, function (err, res) {
        if (err) {
            cb({
                code: 400,
                message: "Error in updating password"
            })
        } else {
            cb({
                code: 200,
                message: "Password updated successfully"
            })
        }
    });
}

module.exports.updatePassword = updatePassword;