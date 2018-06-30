function getprojectquestions(req, db, cb) {
    let projectId = req.body.projectId;
    let data = db.collection(`${projectId}::details`);
    data.find().toArray(function (err, response) {
        if (!err) {
            if (response.length > 0) {
                const projectsData = db.collection('projects');
                projectsData.findOne({projectId: projectId})
                    .then((projectDetails) => {
                        cb({
                            code: 200,
                            data: response,
                            title: projectDetails.projectName,
                            description: projectDetails.description || "No description"
                        })
                    }).catch((error) => {
                    cb({
                        code: 400,
                        message: "Error in loading questions",
                        err: error
                    })
                })
            } else {
                cb({
                    code: 200,
                    data: []
                })
            }
        } else {
            cb({
                code: 400,
                message: "Error in loading questions", 
                err: err
            })
        }
    })
}

module.exports.getprojectquestions = getprojectquestions;