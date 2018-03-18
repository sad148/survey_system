function getprojectquestions(req, db, cb) {
    let projectId = req.body.projectId;
    let data = db.collection(`${projectId}::details`);
    data.find().toArray(function(err, response){
        if(!err) {
            if(response.length > 0) {
                cb({
                    code: 200,
                    data: response
                })
            } else {
                cb({
                    code:200,
                    data:[]
                })
            }
        } else {
            cb({
                code: 400,
                message: "Error in loading questions"
            })
        }
    })
}

module.exports.getprojectquestions = getprojectquestions;