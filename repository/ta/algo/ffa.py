"""
Algorithm for FFA. Will use a Rosita strategy of doding the student's
high degree strategy by shifting right rather than reducing slope.
Will pick a threshold based on last year.
"""

import json

FILENAME = "8.20.7.json"
NUM_PICKS = int(FILENAME.split("\\")[-1].split(".")[1])

if __name__ == "__main__":
    data = json.load(open(FILENAME))
    edgeDict = dict()
    degs = []

    for k in data:
        edgeDict[int(k)] = [int(v) for v in data[k]]
        degs.append((len(data[k]), int(k)))
    degs = sorted(degs, reverse=True)

    strats = [[x[1] for x in degs[125 : 125 + NUM_PICKS]]] * 50
    with open(f"ta_ffa_{FILENAME}", 'w') as file:
        for strat in strats:
            file.writelines([str(i) + "\n" for i in strat])
