function optionsMapping(option) {
    let mapping = {
        1: "Strongly agree",
        2: "Agree",
        3: "Somewhat agree",
        4: "Neither agree nor disagree",
        5: "Somewhat disagree",
        6: "Disagree",
        7: "Strongly disagree"
    }
    return mapping[option];
}

module.exports.optionsMapping = optionsMapping;