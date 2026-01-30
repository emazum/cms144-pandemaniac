var minute = 60
  , descriptions = { degree: "[TA GRAPH] This TA will pick the nodes with the highest degree!"
                   , fewer: "[TA GRAPH] This TA will get to pick fewer seed nodes."
                   , more: "[TA GRAPH] This TA will get to pick more seed nodes"
                   };

db.graphs.drop();

load("pandemaniac-graphui/setup/setup-graphs-day1.js");
load("pandemaniac-graphui/setup/setup-graphs-day2.js");
load("pandemaniac-graphui/setup/setup-graphs-day3.js");
load("pandemaniac-graphui/setup/setup-graphs-day4.js");
load("pandemaniac-graphui/setup/setup-graphs-day5.js");
load("pandemaniac-graphui/setup/setup-graphs-round1.js");
load("pandemaniac-graphui/setup/setup-graphs-round2.js");
load("pandemaniac-graphui/setup/setup-graphs-round3.js");
