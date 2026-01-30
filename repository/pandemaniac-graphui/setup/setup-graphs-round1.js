var category = "round1"
  , start = ISODate("2022-02-25T00:00:00.000Z")
  , end = ISODate("2022-02-26T00:00:00.000Z");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insert({
  name: "16.10.1"
, category: category
, file: "16.10.1.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "16.10.2"
, category: category
, file: "16.10.2.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "16.10.3"
, category: category
, file: "16.10.3.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.10.6"
, category: category
, file: "8.10.6.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.20.8"
, category: category
, file: "8.20.8.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.20.9"
, category: category
, file: "8.20.9.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "4.10.6"
, category: category
, file: "4.10.6.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insert({
  name: "4.10.7"
, category: category
, file: "4.10.7.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insert({
  name: "4.20.1"
, category: category
, file: "4.20.1.json"
, timeout: minute * 5
, start: start
, end: end
});
