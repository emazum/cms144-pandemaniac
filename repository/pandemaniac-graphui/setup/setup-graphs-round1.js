var category = "round1"
  , start = ISODate("2026-02-02T03:00:00.000-08:00")
  , end = ISODate("2026-02-02T23:59:59.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "RR.10.15"
  , category: category
  , file: "RR.10.15.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.ER
});
db.graphs.insertOne({
  name: "RR.10.25"
  , category: category
  , file: "RR.10.25.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.PA
});
db.graphs.insertOne({
  name: "RR.10.35"
  , category: category
  , file: "RR.10.35.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "RR.10.45"
  , category: category
  , file: "RR.10.45.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "RR.10.55"
  , category: category
  , file: "RR.10.55.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
db.graphs.insertOne({
  name: "J.15.15"
  , category: category
  , file: "J.15.15.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "J.25.25"
  , category: category
  , file: "J.25.25.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "J.20.35"
  , category: category
  , file: "J.20.35.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
