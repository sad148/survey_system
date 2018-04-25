function validateemail(req, db, cb) {
    let data = req.body;
    let email = data.email.toLowerCase();
    const usersData = db.collection('users');
    usersData.findOne({email: email})
        .then((response) => {
            if (response === null) {
                cb({
                    code: 200,
                    validate: false
                })
            } else {
                cb({
                    code: 200,
                    validate: true
                })
            }
        })
}

module.exports.validateemail = validateemail