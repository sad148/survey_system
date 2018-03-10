import sys, json
from savReaderWriter.savWriter import *;

file1 = open("F:/Project/survey_system/apis/models/data.json")
data = json.loads(file1.read())
savFileName = "./exports/" + sys.argv[1];
varNames = data["varNames"]["varNames"];
records = data["records"]["records"];
varTypes = data["varTypes"]
varLabels = data["varLabel"]
measureLevels = data["measureLevels"]
with SavWriter(savFileName, varNames, varTypes, None, varLabels, None, None, measureLevels) as writer:
    for record in records:
        writer.writerow(record)
