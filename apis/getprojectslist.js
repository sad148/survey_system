function getprojectslist(req, db, cb) {
    let data = req.body
    let userid = data.userid;
    const projectsData = db.collection('projects');
    projectsData.find({userid: userid}).toArray(function (err, projectsResp) {
        if (err) {
            cb({
                code: 400,
                message: "Error in projects query"
            })
        } else {
            if (projectsResp.length == 0) {
                cb({
                    code: 200,
                    message: "No projects created yet",
                    data: {
                        projects:[]
                    }
                })
            } else {
                let response = {
                    code:200,
                    data:{
                        projects:projectsResp
                    }
                }
                cb(response);
            }
        }
    })
}

module.exports.getprojectslist = getprojectslist;