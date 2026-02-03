from CONFIG import *
from main import do_main, get_graph

import argparse
import copy
import json
import os
import random
from pymongo import MongoClient

db = MongoClient(DB_SERVER, DB_PORT)

def get_teams():
  """
  Function: get_teams
  -------------------
  Gets all the teams' names from the database
  """
  ret = []
  cursor = db.pandemaniac.teams.find({})
  for document in cursor:
    ret.append(document["name"])
  return ret

def run_day(config):
  """
  Function: run_day
  ------------------------
  Given a day configuration, run the graphs and games for that day.
  """
  # Loop through each graph for this day/competition round.
  for (graph, num_teams, num_nodes) in config:
    teams = [x for x in orig_teams]
    team_copy = copy.deepcopy(teams)
    # Filter out teams who have not submitted for this graph.
    for team in team_copy:
      team_dir = TEAMS_FOLDER + team + "/"
      graph_files = [f for f in os.listdir(team_dir) \
        if f.startswith(graph + "-")]
      if len(graph_files) == 0:
        teams.remove(team)
    # Round Robin
    if num_teams == 2:
      for i in range(len(teams)):
        for j in range(i + 1, len(teams)):
          do_main(graph, [teams[i], teams[j]], "majority_colored")
    # Free For All:
    else:
      if len(teams) > 0:
        do_main(graph, teams, "majority_colored")

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  # Day of the practice rounds or competition.
  parser.add_argument("--day")
  parser.add_argument("--teams", nargs="+")
  args = parser.parse_args()
  (day, orig_teams) = (args.day, args.teams)

  # Add all
  if "all" in orig_teams:
    orig_teams = get_teams()
  print("Using Teams: ", orig_teams)

  # Set config to correct day
  config = DAYS[day]
  run_day(config)
