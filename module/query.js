var connection = require('../index.js')

function runQuery(query, cb) {
    connection.query(query, (err, res) => {
        if (err)
            cb(err);
        else
            cb(res);
    })
}

module.export.runQuery = runQuery;