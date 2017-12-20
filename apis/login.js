const md5 = require('md5');

function login (req, connection, cb) {
    console.log(req.body);
    let data = req.body.data
    let username = data.username;
    let password = md5(data.password);
    connection.query('select * from user where email = ? AND password = ?', [username,password], (err, response, fields) => {
        console.log(err);
        if (err) {
            cb({
                code:400,
                message:"Error in sql query"
            })
        } else {
            cb({
                code:200,
                data:response
            })
        }
    })
}

module.exports.login = login;