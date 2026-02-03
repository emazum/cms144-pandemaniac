from pymongo import MongoClient
from collections import defaultdict

db = MongoClient("localhost", 27017)

GRAPHS= [
    "RR.10.15",
    "RR.10.25",
    "RR.10.35",
    "RR.10.45",
    "RR.10.55"
]

data = db.pandemaniac.runs.find({})

wins = defaultdict(int)

for doc in data:
    if doc['graph'] not in GRAPHS:
        continue
    for team in doc['teams']:
        wins[team] += int(doc['scores'][team] == 20)

print(sorted(wins.items(), key=lambda x: x[1], reverse=True))