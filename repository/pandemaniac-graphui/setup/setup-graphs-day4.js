var category = "day4"
  , start = ISODate("2026-02-02T03:00:00.000-08:00")
  , end = ISODate("2026-02-02T23:59:59.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "RR.10.13"
  , category: category
  , file: "RR.10.13.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.ER
});
db.graphs.insertOne({
  name: "RR.10.23"
  , category: category
  , file: "RR.10.23.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.PA
});
db.graphs.insertOne({
  name: "RR.10.33"
  , category: category
  , file: "RR.10.33.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "RR.20.43"
  , category: category
  , file: "RR.20.43.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "RR.10.53"
  , category: category
  , file: "RR.10.53.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
db.graphs.insertOne({
  name: "J.10.13"
  , category: category
  , file: "J.10.13.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SSBM
});
db.graphs.insertOne({
  name: "J.10.23"
  , category: category
  , file: "J.10.23.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.Caltech
});
db.graphs.insertOne({
  name: "J.25.33"
  , category: category
  , file: "J.25.33.json"
  , timeout: minute * 5
  , start: start
  , end: end
  , desc: descriptions.SNAP
});
