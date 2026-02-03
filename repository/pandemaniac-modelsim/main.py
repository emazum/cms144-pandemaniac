"""
Class: main.py
--------------
Main class for the epidemic model simulator. Handles input and output of files
and to the database.
"""

import argparse
from collections import OrderedDict
import json
import os
from pymongo import MongoClient
import sys
import time

from CONFIG import *
from simulation import Simulation

db = MongoClient(DB_SERVER, DB_PORT)

def get_graph(graph):
  """
  Function: get_graph
  -------------------
  Gets the actual file name of the graph specified by graph.
  """
  f = db.pandemaniac.graphs.find_one({ "name" : graph })
  if f is not None:
    return f["file"]
  return None

def create_adj_list(graph_file):
  """
  Function: create_adj_list
  -------------------------
  Creates the adjacency list representation of the graph from a file containing
  the graph. The file is in JSON format.

  graph: The graph to create an adjacency list for.
  returns: An adjacency list.
  """
  adj_list = json.loads("".join(graph_file.readlines()))
  # Convert the values to strings.
  for key in adj_list.keys():
    adj_list[key] = [str(x) for x in adj_list[key]]
  return adj_list 

def read_nodes(graph, valid_nodes, teams):
  """
  Function: read_nodes
  --------------------
  Reads in the node selection for a team and creates a mapping of the team to
  the nodes they chose.

  graph: The corresponding graph.
  teams: The list of teams.
  returns: A dictionary containing the key as the team and the value as the
           array of list of chosen nodes.
  """
  team_nodes = {}

  for team in teams:
    # Gets this team's submission by getting the most recent submission for
    # this particular graph.
    team_dir = TEAMS_FOLDER + team + "/"

    try:
      # Take most recent submission
      team_file_name = max([f for f in os.listdir(team_dir) \
        if f.startswith(graph)])
      team_file = open(team_dir + team_file_name, "r")

      # Read in all of the nodes and filter out spaces and newlines.
      team_file_lines = team_file.read().split("\n")
      entire_nodes = [x.strip().replace("\r", "") for x in team_file_lines]
      nodes_list = []
      num_nodes = int(len(entire_nodes) / GAMES)
      if not team[:3] == "TA_" and num_nodes > int(graph.split(".")[1]):
        raise Exception("Incorrect Node Count.")
      for i in range(GAMES):
          nodes_list.append(entire_nodes[num_nodes*i: num_nodes*(i+1)])

      team_file.close()

      # The list of nodes a team submits should now be valid.
      team_nodes[team] = []
      for nodes in nodes_list:
        is_valid = True
        for node in nodes:
          if node not in valid_nodes:
            is_valid = False
            print("Nodes for team " + team + " are not valid.")
            break
        if is_valid:
          team_nodes[team].append(nodes)

    # Except file not found, incorrect node count.
    except (OSError, Exception, ValueError) as e:
      print("Team Error:", team, e)
      team_nodes[team] = []

  for t in teams:
    with open(DOWNLOAD_FOLDER + '%s-%s.json' % (graph, t), 'w') as f:
      f.write(json.dumps({t: team_nodes[t]}))

  return team_nodes


def update_points(results):
  """
  Function: update_points
  -----------------------
  Update the results of this run.

  results: The results of this run. Is a dictionary with the keys as the teams
           and values as the nodes for that team. Computes the number of points
           each team gets by the number of nodes they have.
  """

  # Put the teams in order of number of nodes they have, sorted most to least.
  # Result is a list of tuples (team, number of nodes).
  ranked_teams = [(x[0], len(x[1])) for x in results.items()]
  ranked_teams = sorted(ranked_teams, key=lambda k: k[1], reverse=True)
  # Olympic scoring. Add the score to the database.
  scores = {}
  # Start at 0 due to i > 0 logic below.
  rank = 0
  for i in range(len(ranked_teams)):
    (team, num) = ranked_teams[i]
    # If they have the same number of nodes as the previous rank, they are
    # tied. They get the same points as the previous team.
    if not (i > 0 and num == ranked_teams[i - 1][1]):
      rank = i + 1
    # Teams that didn't get any nodes get a score of 0.
    scores[team] = (POINTS[rank] if (rank <= len(POINTS) and num > 0) else 0)

  return scores

def run_games(model, teams, adj_list, team_nodes_list, total_results, game_iteration_results, scores):
  """
  Function: run_games
  -----------------------
  Run a games given the graph and team nodes. Return final maps, final score.
  """
  for i in range(GAMES):
    team_nodes = {}
    for team in team_nodes_list.keys():
        if len(team_nodes_list[team]) > i:
            team_nodes[team] = team_nodes_list[team][i]
        else:
            team_nodes[team] = []
    iteration_results = OrderedDict()
    iteration_results["-1"] = team_nodes
    simulation = Simulation(model, team_nodes, adj_list)
    (output, results) = simulation.run()
    iteration_results.update(output)
    game_iteration_results.append(iteration_results)
    total_results[str(i)] = results
    for team in teams:
        scores[team] += update_points(results)[team]

def calc_final_scores(scores, final_scores):
  """
  Function: calc_final_scores
  -----------------------
  Take in total scores for all games, calculate final points for
  competition purposes.
  """
  sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)

  # Start at 0 since logic will always increment on index 0.
  final_rank = 0
  for i, (team, score) in enumerate(sorted_scores):
      # 0 Score means 0 points regardless. This makes identical submissions
      # for round robin result in a loss for both players.
      if score == 0:
        final_scores[team] = 0
        continue

      # If they have the same score as the previous rank, they are
      # tied. They get the same final points as the previous team.
      if not (i > 0 and score == sorted_scores[i - 1][1]):
        final_rank = i + 1
      final_scores[team] = POINTS[final_rank]

def write_outputs(graph, total_results, game_iteration_results, final_scores, teams):
  """
  Function: do_main
  -----------------------
  Write all games results for this matchup into JSON file, insert into DB.
  """
  t = str(time.time())
  output_filename = graph + "-" + t + ".txt"
  output_file = open(OUTPUT_FOLDER + output_filename, "w")
  output_file.write(str(json.dumps(total_results)))
  output_file.close()

  output_with_iteration_filename = graph + "-" + t + "-" + "iteration" + ".txt"
  output_with_iteration_file = open(OUTPUT_FOLDER + output_with_iteration_filename, "w")
  output_with_iteration_file.write(str(json.dumps(game_iteration_results)))
  output_with_iteration_file.close()

  # Get the final results of teams to their nodes and update their points in
  # the database.
  db["pandemaniac"]["runs"].update_one(
    {
      "teams": teams,
      "graph": graph
    },
    {
      "$set": {
        "teams": teams,
        "scores": final_scores,
        "graph": graph,
        "file": output_filename,
        "iteration_file": output_with_iteration_filename
      } 
    },
    upsert=True
  )

def do_main(graph, teams, model):
  """
  Function: do_main
  -----------------------
  Run a game given a graph, teams, and model
  """

  print("Graph: ", graph, "Teams: ", teams)

  # Create the adjacency list for the graph.
  with open(GRAPH_FOLDER + get_graph(graph), "r") as graph_file:
    adj_list = create_adj_list(graph_file)
  # Read in the node selection for each team.
  team_nodes_list = read_nodes(graph, set(adj_list.keys()), teams)

  # Run the simulation and output the run to file.
  total_results = OrderedDict()
  game_iteration_results = []   # include all iteration results in all games. iteration "-1" is the nodes that each team pick
  scores = {team:0 for team in teams}
  final_scores = {team:0 for team in teams}
  
  run_games(model, teams, adj_list, team_nodes_list, total_results, game_iteration_results, scores)
  calc_final_scores(scores, final_scores)
  write_outputs(graph, total_results, game_iteration_results, final_scores, teams)

if __name__ == "__main__":
  # Parse the command-line arguments to get the graph and teams participating.
  parser = argparse.ArgumentParser(description='Get the graph and teams.')
  parser.add_argument("--graph")
  parser.add_argument("--teams", nargs='+')
  parser.add_argument("--model")
  args = parser.parse_args()
  (graph, teams, model) = (args.graph, args.teams, args.model)

  # Usage message.
  if graph is None or teams is None or model is None:
    print("Usage: main.py --graph [graph name] --teams " + \
      "[list of team names] --model [model name]")
    sys.exit(0)

  do_main(graph, teams, model)
