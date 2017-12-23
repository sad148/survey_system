const md5 = require('md5');
var uuid = require('uuid/v1');
//var runQuery = require('../models/query.js')

function registerUser (req, connection, cb) {
    let data = req.body.data;
    data.password = md5(data.password);
    data.user_id = uuid();
    data.user_id = data.user_id.split('-').join("");
    data.contact_number=data.phone;
    delete data.confirm;
    delete data.phone;
    connection.query('insert into user SET ? ', data, (err, response, fields) => {
        if (err) {
            console.log(err);
            cb({
                code:400,
                message:"Error in sql query"
            })
        } else {
            cb({
                code:200,
                data:fields
            })
        }
    })
}

module.exports.registerUser = registerUser;