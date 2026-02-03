var category = "round2"
  , start = ISODate("2022-02-26T03:00:00.000-08:00")
  , end = ISODate("2022-02-27T00:00:00.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "16.10.4"
, category: category
, file: "16.10.4.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "16.10.5"
, category: category
, file: "16.10.5.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "16.10.6"
, category: category
, file: "16.10.6.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.10.7"
, category: category
, file: "8.10.7.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.10.8"
, category: category
, file: "8.10.8.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.20.A"
, category: category
, file: "8.20.A.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.10.8"
, category: category
, file: "4.10.8.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.10.9"
, category: category
, file: "4.10.9.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.20.2"
, category: category
, file: "4.20.2.json"
, timeout: minute * 5
, start: start
, end: end
});
