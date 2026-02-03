db.teams.drop()
db.graphs.drop()
db.runs.drop()
db.attempts.drop()
db.createCollection("runs")
load("pandemaniac-graphui/setup/ensure-indices.js");
load("pandemaniac-graphui/setup/setup-graphs.js");