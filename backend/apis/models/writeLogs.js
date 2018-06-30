const fs = require('fs');
const moment = require('moment');
function writeLogs(type, log) {
    let data = "\n" + type + "\n" + JSON.stringify(log);
    let path = __dirname.replace("models","logs/");
    let filename = moment().format("MM-DD-YYYY");
    fs.appendFileSync(path + filename + '.log', data);
    return;
}

module.exports.writeLogs = writeLogs;