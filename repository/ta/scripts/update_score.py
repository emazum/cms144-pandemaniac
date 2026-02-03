"""
Scoring for final rounds is weird, this was 2022WI method.
"""

from pymongo import MongoClient
from CONFIG import *

db = MongoClient(DB_SERVER, DB_PORT)
db = db.pandemaniac

round1 = {
"CascadingStyleSheets":25,
"CauchysWartz":14,
"DeepFriedOreos":6,
"GoingViral":0,
"NetNavis":14,
"PagesOfRank":4,
"Pandesaniacs":35,
"ReadyToSpready":9,
"SlamDunk":2,
"Sparkers":38,
"Sriracha":0,
"UncountablyManyCooks":17,
"crocs_rock":0,
"graphpox":36,
"nottheTAs":0,
"thisisarandomname":6
}

round2 = {
"CascadingStyleSheets":18,
"CauchysWartz":22,
"NetNavis":31,
"Pandesaniacs":7,
"ReadyToSpready":33,
"Sparkers":19,
"UncountablyManyCooks":30,
"graphpox":47
}

round3 = {
"NetNavis":55,
"ReadyToSpready":47,
"UncountablyManyCooks":36,
"graphpox":30
}

for team in round1:
    db.TScore.insert({"team": team, "score": round1[team], "round": "round1"})

for team in round2:
    db.TScore.insert({"team":team, "score":round2[team], "round":"round2"})

for team in round3:
    db.TScore.insert({"team":team, "score":round3[team], "round":"round3"})
