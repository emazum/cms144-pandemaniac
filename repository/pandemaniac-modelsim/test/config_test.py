import sys
import json
from os import path

# Go up two directories
sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))

from CONFIG import *

def validate_graph(path):
    with open(path, 'r') as file:
        adj_list = json.load(file)
    for v in adj_list:
        try:
            assert(v not in adj_list[v])
            assert(int(v) < len(adj_list) and int(v) >= 0)
            for n in adj_list[v]:
                assert(int(n) < len(adj_list) and int(n) >= 0)
                assert(v in adj_list[n])
        except AssertionError:
            print(v)
            exit(1)
    return len(adj_list)

# Test each day's graphs
for day in DAYS:
    for name, n_players, n_nodes in DAYS[day]:
        deg = validate_graph(GRAPH_FOLDER + name + '.json')
        print(f"Validated {name}, n={deg}")