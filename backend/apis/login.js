const md5 = require('md5');

function login(req, db, cb) {
    let data = req.body.data
    let username = data.username.toLowerCase();
    let password = md5(data.password);
    db.collection('users').findOne({email: username, password: password})
        .then((res) => {
            if (res == null) {
                cb({
                    code: 204,
                    message: "Incorrect username/password"
                })
            } else {
                delete res._id;
                delete res.password;
                res.projects = []
                const projectsData = db.collection('projects');
                if (username === "admin") {
                    projectsData.find({}, {sort: {'createdAt': -1}}).toArray(function (err, projectsResp) {
                        if (err) {
                            cb({
                                code: 400,
                                message: "Error in getting list of projects"
                            })
                        } else {
                            res.admin = true;
                            if (res.length == 0) {
                                cb({
                                    code: 200,
                                    message: "No projects created yet",
                                    data: res
                                })
                            } else {
                                res.projects = projectsResp
                                cb({
                                    code: 200,
                                    data: res
                                })
                            }
                        }
                    });
                } else {
                    projectsData.find({userid: res.user_id}, {sort: {'createdAt': -1}}).toArray(function (err, projectsResp) {
                        if (err) {
                            cb({
                                code: 400,
                                message: "Error in getting list of projects"
                            })
                        } else {
                            res.admin = false;
                            if (res.length == 0) {
                                cb({
                                    code: 200,
                                    message: "No projects created yet",
                                    data: res
                                })
                            } else {
                                res.projects = projectsResp
                                cb({
                                    code: 200,
                                    data: res
                                })
                            }
                        }
                    })
                }
            }
        })
        .catch((err) => {
            cb({
                code: 400,
                message: "Error in logging in"
            })
            console.log(err);
        })
}

module.exports.login = login;