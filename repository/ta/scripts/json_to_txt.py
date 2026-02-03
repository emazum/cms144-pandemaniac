import json
import random

FILENAMES = [
    "2.10.21-1",
    "2.10.22-1",
    "2.10.23-1",
    "2.10.32-1",
    "2.10.33-1"
]

for file in FILENAMES:
    with open(file + ".json", 'r') as f:
        data = json.load(f)
    
    strats = []
    for team in data:
        strats = data[team]

    random.shuffle(strats)

    with open(file + ".txt", 'w') as f:
        for strat in strats:
            for node in strat:
                f.write(node + "\n")
