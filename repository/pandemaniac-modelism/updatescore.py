from pymongo import MongoClient
from CONFIG import *

db = MongoClient(DB_SERVER, DB_PORT)
db = db.test

round1 = {"illuminati1337": 12,\
"CaltechFTW": 15,\
"YDGB": 20,\
"Pajole": 9,\
"LCDx": 6,\
"JColeFanClub": 4,\
"JEDI": 2,\
"sixtypercent": 2,\
"strugglebus": 2,\
"hosts_and_flows": 0,\
"Freestyle": 0,\
"Red_Mansion": 0,\
"2pox": 0}

for team in round1:
    db.TScore.insert({"team": team, "score": round1[team], "round": "round1"})
