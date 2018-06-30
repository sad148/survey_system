function getprojectslist(req, db, cb) {
    let data = req.body
    let userid = data.userid;
    let username = data.username
    const projectsData = db.collection('projects');
    if (username === "admin") {
        //projectsData.find({}, {sort: {'createdAt': -1}}).toArray(function (err, projectsResp) {
        projectsData.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userid',
                    foreignField: 'user_id',
                    as: 'userdetails'
                }
            }, {
                $sort: {
                    createdAt: -1
                }
            }
        ]).toArray(function (err, projectsResp) {
            if (err) {
                cb({
                    code: 400,
                    message: "Error in getting list of projects",
                    err: err
                })
            } else {
                if (projectsResp.length == 0) {
                    cb({
                        code: 200,
                        message: "No projects created yet",
                        data: {
                            admin: true,
                            projects: []
                        }
                    })
                } else {
                    projectsResp.map((projects) => {
                        projects.userdetails.map((userDetails) => {
                            projects.userdetails = userDetails
                        })
                    })
                    let response = {
                        code: 200,
                        data: {
                            admin: true,
                            projects: projectsResp
                        }
                    }
                    cb(response);
                }
            }
        })
    }
    else {
        projectsData.find({userid: userid}, {sort: {'createdAt': -1}}).toArray(function (err, projectsResp) {  //-1 in sort query signifies descending order
            if (err) {
                cb({
                    code: 400,
                    message: "Error in getting list of projects",
                    err: err
                })
            } else {
                if (projectsResp.length == 0) {
                    cb({
                        code: 200,
                        message: "No projects created yet",
                        data: {
                            projects: []
                        }
                    })
                } else {
                    let response = {
                        code: 200,
                        data: {
                            projects: projectsResp
                        }
                    }
                    cb(response);
                }
            }
        })
    }
}

module.exports.getprojectslist = getprojectslist;