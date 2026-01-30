### mongodb is broken :( 

db.graphs.insert({name: "8.35.1", category: "day1", file: "8.35.1.json", timeout: 60 * 3, start: ISODate("2022-02-09T17:00:00.000Z"), end: ISODate("2022-02-10T00:00:00.000Z")});







NODE_DEBUG=cluster,net,http,fs,tls,module,timers node app.js



Check that graph names and filenames match

`db.graphs.find().forEach(function(doc){print("graphname: " + doc.name  + ", filename: "+doc.file)})`

