from collections import Counter
from model import Model
import random

# Seed the random number generator.
SEED = 144144
random.seed(SEED)

class WeightedRandom(Model):
  """
  Class: WeightedRandom
  ---------------------
  A node randomly takes on a color of one of its neighbors, where the
  probability of this occuring is proportional to the number of neighbors with
  the same color. For example, if a node has 3 red neighbors and 2 blue
  neighbors, it can become red with probability 3/5 and blue with probability
  2/5.
  """

  def update(self, node_color, node):
    neighbors = self.adj_list[node]
    colored_neighbors = list(filter(None, [node_color[x] for x in neighbors]))
    team_count = Counter(colored_neighbors)

    # If the node is colored, it gives itself a 3/2 vote.
    if node_color[node] is not None:
      if node_color[node] not in team_count:
        team_count[node_color[node]] = 0
      team_count[node_color[node]] += 1.5

    if len(team_count) > 0:
      teams = []
      weights = []
      for x in team_count.items():
        teams.append(x[0])
        weights.append(x[1])
      return (True, random.choices(teams, weights=weights))

    return (False, node_color[node])
