"""
Reindexes the nodes of a graph with N nodes from 0 to N - 1. The input graph
is already in JSON format.
"""
from __future__ import print_function

import json
import sys

from collections import OrderedDict

def do_main(fin, fout):
  """
  Reindexes the nodes in fin and outputs it to fout.
  """
  # The re-indexed adjacency list.
  reindexed_list = {}
  # Mapping from the original node's number to a new number.
  indices = {}
  # Current index number.
  index = 0

  adj_list = json.load(fin)
  for a in adj_list.keys():
    if a not in indices:
      indices[a] = str(index)
      reindexed_list[indices[a]] = []
      index += 1

    for b in adj_list[a]:
      if b not in indices:
        indices[b] = str(index)
        reindexed_list[indices[b]] = []
        index += 1

      reindexed_list[indices[a]].append(indices[b])

  print(json.dumps(sort_keys(reindexed_list)), file=fout)


def sort_keys(adj_list):
  """
  Sorts JSON representation of the graph so the keys are sorted and the
  list of neighbors of those keys are also sorted.
  """
  sorted_list = OrderedDict()
  for key in sorted(adj_list, key=int):
    sorted_list[key] = sorted(adj_list[key], key=int)

  return sorted_list


def usage():
  return 'python reindex.py [ INPUT [ OUTPUT ] ]'


if __name__ == '__main__':
  argc = len(sys.argv) - 1

  fin = sys.stdin
  fout = sys.stdout

  if argc >= 3 or argc < 1:
    print(usage(), file=sys.stderr)
    sys.exit(2)

  if argc >= 1:
    fin = open(sys.argv[1], 'r')

    if argc >= 2:
      fout = open(sys.argv[2], 'w')

  do_main(fin, fout)

  fin.close()
  fout.close()
