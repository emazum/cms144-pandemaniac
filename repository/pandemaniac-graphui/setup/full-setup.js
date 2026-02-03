db.teams.drop()
db.graphs.drop()
db.runs.drop()
db.attempts.drop()
db.createCollection("runs")
load("pandemaniac-graphui/setup/ensure-indices.js");
// Add TA teams
db.teams.insertMany([
	{ name: "TA_baseline" },
	{ name: "TA_target" },
	{ name: "TA_hard" }
]);
load("pandemaniac-graphui/setup/setup-graphs.js");