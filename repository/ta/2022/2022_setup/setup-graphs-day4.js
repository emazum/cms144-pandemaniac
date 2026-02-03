var category = "day4"
  , start = ISODate("2022-02-23T03:00:00.000-08:00")
  , end = ISODate("2022-02-24T00:00:00.000-08:00");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insertOne({
  name: "2.5.4"
, category: category
, file: "2.5.4.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.5.4"
, category: category
, file: "4.5.4.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "4.10.4"
, category: category
, file: "4.10.4.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insertOne({
  name: "2.10.13"
, category: category
, file: "2.10.13.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.degree
});
db.graphs.insertOne({
  name: "2.10.23"
, category: category
, file: "2.10.23.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.fewer
});
db.graphs.insertOne({
  name: "2.10.33"
, category: category
, file: "2.10.33.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.more
});
db.graphs.insertOne({
  name: "8.10.4"
, category: category
, file: "8.10.4.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.20.5"
, category: category
, file: "8.20.5.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.25.2"
, category: category
, file: "8.25.2.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insertOne({
  name: "8.40.2"
, category: category
, file: "8.40.2.json"
, timeout: minute * 5
, start: start
, end: end
});
