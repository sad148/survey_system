import sys
print(sys.argv)

from savReaderWriter.savWriter import *;
savFileName = 'someFile.sav'
records = [[b'Test1', 1, 1], [b'Test2', 2, 1],[b'Test3','',2]]
varNames = ['var1', 'v2', 'v3']
varTypes = {'var1': 32767, 'v2': 0, 'v3': 0}
with SavWriter(savFileName, varNames, varTypes) as writer:
    for record in records:
        writer.writerow(record)
