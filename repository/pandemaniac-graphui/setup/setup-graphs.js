var minute = 60
  , descriptions = {
    ER: "This is an Erdos-Renyi graph.",
    PA: "This is a Preferential Attachment graph.",
    SSBM: "This is a Symmetric Stochastic Block graph.",
    Caltech: "This is a Caltech network crawler generated graph.",
    SNAP: "This is a graph from the Stanford SNAP dataset."
  };

load("pandemaniac-graphui/setup/setup-graphs-day1.js");
load("pandemaniac-graphui/setup/setup-graphs-day2.js");
load("pandemaniac-graphui/setup/setup-graphs-day3.js");
load("pandemaniac-graphui/setup/setup-graphs-day4.js");
load("pandemaniac-graphui/setup/setup-graphs-day5.js");
load("pandemaniac-graphui/setup/setup-graphs-round1.js");
load("pandemaniac-graphui/setup/setup-graphs-round2.js");
load("pandemaniac-graphui/setup/setup-graphs-round3.js");

// insert num_nodes for each of the graph in the db
(async function insertNumNodes() {
  const prefix = 'pandemaniac-graphui/private/graphs/';
  try {
    await db.graphs.find().forEach(function (graph) {
      let g = JSON.parse(fs.readFileSync(prefix + graph.file));
      let numNodes = Object.keys(g).length;
      db.graphs.updateOne({ _id: graph._id },
        {
          $set: {
            numNodes: numNodes
          }
        });
    });
  } catch (e) {
    console.log(e);
  }
})();