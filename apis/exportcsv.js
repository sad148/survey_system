function exportcsv(req, db, cb) {
    console.log(req.body);
    let projectId = req.body.projectId;
    let data = db.collection(`${projectId}::answers`);
    console.log(projectId);
    data.aggregate(
        [{
            "$match": {
                "userId": {
                    "$ne": null
                }
            }
        },
            {
                "$group": {
                    "_id": {
                        "answer": "$answer",
                        "question": "$question"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ]
    )
        .toArray(function (err, res) {
            if (res.length == 0) {
                cb({
                    code:204,
                    message:"No answers posted yet"
                })
            } else {

            }
        })
}

module.exports.exportcsv = exportcsv;