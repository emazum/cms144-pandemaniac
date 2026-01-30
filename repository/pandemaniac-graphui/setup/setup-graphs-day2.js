var category = "day2"
  , start = ISODate("2022-02-07T00:00:00.000Z")
  , end = ISODate("2022-10-22T00:00:00.000Z");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insert({
  name: "2.5.2"
, category: category
, file: "2.5.2.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insert({
  name: "4.5.2"
, category: category
, file: "4.5.2.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insert({
  name: "4.10.2"
, category: category
, file: "4.10.2.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insert({
  name: "2.10.11"
, category: category
, file: "2.10.11.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.degree
});
db.graphs.insert({
  name: "2.10.21"
, category: category
, file: "2.10.21.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.fewer
});
db.graphs.insert({
  name: "2.10.31"
, category: category
, file: "2.10.31.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.more
});
db.graphs.insert({
  name: "8.10.2"
, category: category
, file: "8.10.2.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.20.3"
, category: category
, file: "8.20.3.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.25.1"
, category: category
, file: "8.25.1.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.35.2"
, category: category
, file: "8.35.2.json"
, timeout: minute * 5
, start: start
, end: end
});
