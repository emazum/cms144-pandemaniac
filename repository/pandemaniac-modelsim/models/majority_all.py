from collections import Counter
from model import Model

class MajorityAll(Model):
  """
  Class: MajorityAll
  ------------------
  A node takes on the color that the majority of its neighbors have (including
  uncolored nodes).
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
  
    # If most common is majority, change to most common
    most_common = team_count.most_common(1)
    if len(most_common) > 0 and \
      most_common[0][1] > len(neighbors) / 2.0:
      return (True, most_common[0][0])

    return (False, node_color[node])
  