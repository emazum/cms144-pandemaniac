var category = "day5"
  , start = ISODate("2022-02-24T03:00:00.000-08:00")
  , end = ISODate("2022-02-25T00:00:00.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "2.5.5"
, category: category
, file: "2.5.5.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.5.5"
, category: category
, file: "4.5.5.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.10.5"
, category: category
, file: "4.10.5.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "2.10.14"
, category: category
, file: "2.10.14.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.degree
});
db.graphs.insertOne({
  name: "2.10.24"
, category: category
, file: "2.10.24.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.fewer
});
db.graphs.insertOne({
  name: "2.10.34"
, category: category
, file: "2.10.34.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.more
});
db.graphs.insertOne({
  name: "8.10.5"
, category: category
, file: "8.10.5.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.20.6"
, category: category
, file: "8.20.6.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.20.7"
, category: category
, file: "8.20.7.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.35.3"
, category: category
, file: "8.35.3.json"
, timeout: minute * 5
, start: start
, end: end
});
