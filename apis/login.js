const md5 = require('md5');

function login (req, db, cb) {
    let data = req.body.data
    let username = data.username;
    let password = md5(data.password);
    db.collection('users').findOne({email:username, password:password})
        .then((res) => {
            if(res == null) {
                cb({
                    code:204,
                    message:"Incorrect username/password"
                })
            } else {
                delete res._id;
                delete res.password;
                res.projects = []
                const projectsData = db.collection('projects');
                projectsData.find({userid:res.user_id},{sort:{'createdAt':-1}}).toArray(function(err,projectsResp){
                    if(err) {
                        cb({
                            code:400,
                            message:"Error in projects query"
                        })
                    } else {
                        if (res.length == 0) {
                            cb({
                                code: 200,
                                message: "No projects created yet",
                                data: res
                            })
                        } else {
                            res.projects = projectsResp
                            cb({
                                code:200,
                                data:res
                            })
                        }
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })

    // connection.query('select * from user where email = ? AND password = ?', [username,password], (err, response, fields) => {
    //     if (err) {
    //         cb({
    //             code:400,
    //             message:"Error in sql query"
    //         })
    //     } else {
    //         if (response.length == 0) {
    //             cb({
    //                 code:204,
    //                 message:"Incorrect username/password"
    //             })
    //         } else {
    //             response = response[0]
    //             delete response.password;
    //             connection.query('select * from project where user_id = ?',response.user_id, (err, projectResponse) => {
    //                 if (err) {
    //                     cb({
    //                         code:400,
    //                         message:"Error in sql query"
    //                     })
    //                 } else {
    //                     response.projects = []
    //                     if (projectResponse.length == 0) {
    //                         cb({
    //                             code: 200,
    //                             message: "No projects created yet",
    //                             data: response
    //                         })
    //                     } else {
    //                         for (let i = 0; i < projectResponse.length; i++) {
    //                             delete projectResponse[i].user_id;
    //                             response.projects.push(projectResponse[i])
    //                         }
    //                         console.log(response);
    //                         cb({
    //                             code: 200,
    //                             data: response
    //                         })
    //                     }
    //                 }
    //             })
    //         }
    //     }
    // })
}

module.exports.login = login;