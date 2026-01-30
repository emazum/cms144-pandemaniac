var category = "day3"
  , start = ISODate("2022-02-22T00:00:00.000Z")
  , end = ISODate("2022-02-23T00:00:00.000Z");

// NOTE: variables `minute` and `descriptions` defined in setup-graphs.js

db.graphs.insert({
  name: "2.5.3"
, category: category
, file: "2.5.3.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insert({
  name: "4.5.3"
, category: category
, file: "4.5.3.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insert({
  name: "4.10.3"
, category: category
, file: "4.10.3.json"
, timeout: minute * 3
, start: start
, end: end
});
db.graphs.insert({
  name: "2.10.12"
, category: category
, file: "2.10.12.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.degree
});
db.graphs.insert({
  name: "2.10.22"
, category: category
, file: "2.10.22.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.fewer
});
db.graphs.insert({
  name: "2.10.32"
, category: category
, file: "2.10.32.json"
, timeout: minute * 5
, start: start
, end: end
, desc: descriptions.more
});
db.graphs.insert({
  name: "8.10.3"
, category: category
, file: "8.10.3.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.20.4"
, category: category
, file: "8.20.4.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.30.1"
, category: category
, file: "8.30.1.json"
, timeout: minute * 5
, start: start
, end: end
});
db.graphs.insert({
  name: "8.40.1"
, category: category
, file: "8.40.1.json"
, timeout: minute * 5
, start: start
, end: end
});
