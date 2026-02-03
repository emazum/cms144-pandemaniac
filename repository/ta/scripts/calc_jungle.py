from pymongo import MongoClient
from collections import defaultdict

db = MongoClient("localhost", 27017)

GRAPHS= [
    "J.15.15",
    "J.25.25",
    "J.20.35"
]

data = db.pandemaniac.runs.find({})

scores = defaultdict(int)

for doc in data:
    if doc['graph'] not in GRAPHS:
        continue
    for team in doc['teams']:
        scores[team] += doc['scores'][team]

print(sorted(scores.items(), key=lambda x: x[1], reverse=True))