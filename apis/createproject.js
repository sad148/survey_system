const uuid = require('uuid/v1');

function createproject(req, db, cb) {
    let data = req.body.data;
    let userid = req.body.data.userid;
    let description = req.body.data.description
    let step1 = data.step1
    let step2 = data.step2.questions
    let step3 = data.step3.questions
    let step4 = data.step4.questions
    let projectId = uuid().split("-").join("");
    step1.id = projectId
    let steps = [];
    for (let i = 0; i < step2.length; i++) {
        step2[i].stepNum = "step2"
        step2[i].type = "radio"
        delete step2[i].select;
        step2[i].options = []
        for (let j = 1; j <= step2[i].limit; j++) {
            step2[i].options.push(j);
        }
        steps.push(step2[i]);
    }

    for (let i = 0; i < step3.length; i++) {
        step3[i].stepNum = "step3"
        steps.push(step3[i]);
    }

    for (let i = 0; i < step4.length; i++) {
        step4[i].stepNum = "step4"
        steps.push(step4[i]);
    }

    let projectData = {
        userid: userid,
        projectId: projectId,
        description: description,
        projectName: step1.project_name,
        createdAt: new Date(),
        response: 0,
        latestEntry: ""
    }

    db.collection("projects").insertOne(projectData)
        .then((res) => {
            db.createCollection(projectId + "::details", {autoIndexId: false})
                .then((res) => {
                    db.collection(projectId + "::details").insertMany(steps)
                        .then((res) => {
                            cb({
                                code: 200,
                                message: "Project created successfully"
                            })
                        })
                        .catch((err) => {
                            cb({code: 400, message: "Error in creating project"})
                            //console.log("insert err", err);
                        })
                })
                .catch((err) => {
                    cb({code: 400, message: "Error in creating project"})
                    //console.log("err", err);
                })
        })
        .catch((err) => {
            cb({code: 400, message: "Error in creating project"})
        })
}

module.exports.createproject = createproject;