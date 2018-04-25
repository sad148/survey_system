var fs = require('fs')
let list =
    {
        "AF": "Afghanistan",
        "AL": "Albania",
        "DZ": "Algeria",
        "AS": "American Samoa",
        "AD": "Andorra",
        "AO": "Angola",
        "AI": "Anguilla",
        "AQ": "Antarctica",
        "AG": "Antigua & Barbuda",
        "AR": "Argentina"
    }

let arr = [];
for (let i in list) {
    arr.push({
        id: list[i].split(" ").join("").toLowerCase(),
        value: list[i]
    })
}

fs.writeFile('../models/countries', JSON.stringify(arr, 5), (err, res) => {
    if (err)
        throw err
    else console.log(res)
})