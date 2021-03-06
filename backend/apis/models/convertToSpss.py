import sys, json
from savReaderWriter.savWriter import *;

file1 = open(sys.argv[2])
data = json.loads(file1.read())
savFileName = "./exports/" + sys.argv[1];
varNames = data["varNames"]["varNames"];
records = data["records"]["records"];
valueLabel = data["valueLabel"]["valueLabel"]
varTypes = data["varTypes"]
varLabels = data["varLabel"]
measureLevels = data["measureLevels"]
with SavWriter(savFileName, varNames, varTypes, valueLabel, varLabels, None, None, measureLevels) as writer:
    for record in records:
        writer.writerow(record)
