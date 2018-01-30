function getprojectslist(req, db, cb) {
    let data = req.body
    let userid = data.userid;
    const projectsData = db.collection('projects');
    projectsData.find({userid: userid},{sort:{'createdAt':-1}}).toArray(function (err, projectsResp) {  //-1 in sort query signifies descending order
        if (err) {
            console.log(err);
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