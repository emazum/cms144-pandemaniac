var category = "day5"
  , start = ISODate("2026-02-13T03:00:00.000-08:00")
  , end = ISODate("2026-02-13T23:59:59.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "RR.10.14"
  , category: category
  , file: "RR.10.14.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.ER
});
db.graphs.insertOne({
  name: "RR.10.24"
  , category: category
  , file: "RR.10.24.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.PA
});
db.graphs.insertOne({
  name: "RR.10.34"
  , category: category
  , file: "RR.10.34.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "RR.15.44"
  , category: category
  , file: "RR.15.44.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "RR.10.54"
  , category: category
  , file: "RR.10.54.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
db.graphs.insertOne({
  name: "J.15.14"
  , category: category
  , file: "J.15.14.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "J.10.24"
  , category: category
  , file: "J.10.24.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "J.35.34"
  , category: category
  , file: "J.35.34.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
