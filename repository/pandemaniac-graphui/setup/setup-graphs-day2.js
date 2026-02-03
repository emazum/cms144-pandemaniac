var category = "day2"
  , start = ISODate("2026-02-02T03:00:00.000-08:00")
  , end = ISODate("2026-02-02T23:59:59.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "RR.5.11"
  , category: category
  , file: "RR.5.11.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.ER
});
db.graphs.insertOne({
  name: "RR.5.21"
  , category: category
  , file: "RR.5.21.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.PA
});
db.graphs.insertOne({
  name: "RR.10.31"
  , category: category
  , file: "RR.10.31.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "RR.10.41"
  , category: category
  , file: "RR.10.41.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "RR.10.51"
  , category: category
  , file: "RR.10.51.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
db.graphs.insertOne({
  name: "J.5.11"
  , category: category
  , file: "J.5.11.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "J.20.21"
  , category: category
  , file: "J.20.21.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "J.20.31"
  , category: category
  , file: "J.20.31.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
