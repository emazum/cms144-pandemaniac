var category = "round3"
  , start = ISODate("2026-02-18T03:00:00.000-08:00")
  , end = ISODate("2026-02-18T23:59:59.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "RR.10.17"
  , category: category
  , file: "RR.10.17.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.ER
});
db.graphs.insertOne({
  name: "RR.10.27"
  , category: category
  , file: "RR.10.27.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.PA
});
db.graphs.insertOne({
  name: "RR.10.37"
  , category: category
  , file: "RR.10.37.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "RR.15.47"
  , category: category
  , file: "RR.15.47.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "RR.10.57"
  , category: category
  , file: "RR.10.57.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
