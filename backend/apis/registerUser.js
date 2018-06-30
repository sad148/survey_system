const md5 = require('md5');
var uuid = require('uuid/v1');

function registerUser(req, db, cb) {
    let data = req.body.data;
    data.password = md5(data.password);
    data.user_id = uuid();
    data.user_id = data.user_id.split('-').join("");
    data.contact_number = data.phone;
    delete data.confirm;
    delete data.phone;
    data.projects = []
    data.email = data.email.toLowerCase()
    data.securityAnswer1 = md5(data.securityAnswer1.toLowerCase())
    data.securityAnswer2 = md5(data.securityAnswer2.toLowerCase())
    data.securityAnswer3 = md5(data.securityAnswer3.toLowerCase())
    db.collection('users').insertOne(data)
        .then((res) => {
            delete res.ops[0]._id
            cb({
                code: 200
            })
        })
        .catch((err) => {
            cb({
                code: 400,
                message: "Error in registering user"
            })
        })
}

module.exports.registerUser = registerUser;