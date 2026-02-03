from pymongo import MongoClient
from CONFIG import *

db = MongoClient(DB_SERVER, DB_PORT)

db.pandemaniac.runs.remove({})
