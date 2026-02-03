//var category = "day1"
//  , start = ISODate("2022-02-07T17:00:00.000-08:00Z")
//  , end = ISODate("2022-02-10T00:00:00.000-08:00Z");

// actual day
var category = "day1"
  , start = ISODate("2022-02-20T03:00:00.000-08:00")
  , end = ISODate("2023-02-21T00:00:00.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "2.5.1"
, category: category
, file: "2.5.1.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.5.1"
, category: category
, file: "4.5.1.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.10.1"
, category: category
, file: "4.10.1.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "2.10.10"
, category: category
, file: "2.10.10.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.degree
});
db.graphs.insertOne({
  name: "2.10.20"
, category: category
, file: "2.10.20.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.fewer
});
db.graphs.insertOne({
  name: "2.10.30"
, category: category
, file: "2.10.30.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.more
});
db.graphs.insertOne({
  name: "8.10.1"
, category: category
, file: "8.10.1.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.20.1"
, category: category
, file: "8.20.1.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.20.2"
, category: category
, file: "8.20.2.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.35.1"
, category: category
, file: "8.35.1.json"
, timeout: minute * 5
, start: start
, end: end
});
