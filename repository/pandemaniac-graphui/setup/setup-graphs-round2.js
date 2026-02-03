var category = "round2"
  , start = ISODate("2026-02-02T03:00:00.000-08:00")
  , end = ISODate("2026-02-02T23:59:59.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "RR.10.16"
  , category: category
  , file: "RR.10.16.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.ER
});
db.graphs.insertOne({
  name: "RR.10.26"
  , category: category
  , file: "RR.10.26.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.PA
});
db.graphs.insertOne({
  name: "RR.10.36"
  , category: category
  , file: "RR.10.36.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "RR.15.46"
  , category: category
  , file: "RR.15.46.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "RR.10.56"
  , category: category
  , file: "RR.10.56.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
