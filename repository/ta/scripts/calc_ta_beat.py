from pymongo import MongoClient
from collections import defaultdict

db = MongoClient("localhost", 27017)


data = db.pandemaniac.runs.find({})
baseline = set()
target = set()
hard = defaultdict(int)

ta_teams = ["TA_hard", "TA_baseline", "TA_target"]
for doc in data:
    if len(doc["teams"]) > 2:
        continue
    team1 = doc["teams"][0]
    team2 = doc["teams"][1]

    if team1 in ta_teams and team2 in ta_teams:
        continue
    if team2 in ta_teams:
        temp = team1
        team1 = team2
        team2 = temp
    if team1 in ta_teams and doc["scores"][team2] == 20:
        if team1 == "TA_hard":
            hard[team2] += 1
        if team1 == "TA_baseline":
            baseline.add(team2)
        if team1 == "TA_target":
            target.add(team2)

print(baseline, len(baseline))
print(target, len(target))
print(hard, len(hard))