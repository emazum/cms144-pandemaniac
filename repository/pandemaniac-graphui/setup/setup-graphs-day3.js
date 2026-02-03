var category = "day3"
  , start = ISODate("2026-02-11T03:00:00.000-08:00")
  , end = ISODate("2026-02-11T23:59:59.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "RR.10.12"
  , category: category
  , file: "RR.10.12.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.ER
});
db.graphs.insertOne({
  name: "RR.5.22"
  , category: category
  , file: "RR.5.22.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.PA
});
db.graphs.insertOne({
  name: "RR.10.32"
  , category: category
  , file: "RR.10.32.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "RR.10.42"
  , category: category
  , file: "RR.10.42.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "RR.10.52"
  , category: category
  , file: "RR.10.52.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
db.graphs.insertOne({
  name: "J.10.12"
  , category: category
  , file: "J.10.12.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "J.15.22"
  , category: category
  , file: "J.15.22.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "J.30.32"
  , category: category
  , file: "J.30.32.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
