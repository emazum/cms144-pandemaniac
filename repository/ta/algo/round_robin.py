"""
Algorithm for Round Robin TA submissions. Baseline will be degree.
All other TA submissions use the same algorithm, but with varying node #
to balance their power from target -> hard -> impossible.
"""
import json
import numpy as np
import networkx as nx
import heapq
import random
import sim
import time
import math
from tqdm import tqdm

FILENAME = '2.10.22.json'
DEPTH = 9
# For simulation calculation should we want to not manually calculate depth
NUM_PLAYERS = 2
NUM_PICKS = int(FILENAME.split("\\")[-1].split(".")[1])
NUM_STRATS = 50

data = json.load(open(FILENAME))
N = len(data)
NODELIST = list(range(N))

def throw_stuff_at_wall(edgeDict, top_n, depth, num_nodes):
    if depth == 0:
        return random.sample(top_n, num_nodes)
    strats = dict()
    for i in range(NUM_PLAYERS):
        strats[f"s{i}"] = throw_stuff_at_wall(edgeDict, top_n, depth - 1, num_nodes)
    result = sim.run(edgeDict, strats)
    max_i = None
    max_score = -1
    for k in result:
        if result[k] > max_score:
            max_i = k
            max_score = result[k]
    return strats[max_i]

def baseline(sorted_degrees, num_nodes):
    """
    Degree strategy, no scaling.
    """
    return [[x[1] for x in sorted_degrees[:num_nodes]]] * NUM_STRATS

def advanced(graph, sorted_degrees, num_nodes, num_top):
    """
    Advanced strategy of monte-carlo pitting. Tree of configured depth.
    """
    # Pool of NUM_TOP highest degree nodes
    top_n = []
    for node in sorted_degrees[:num_top]:
        top_n.append(node[1])

    strats = []
    for i in tqdm(range(10)):
        strats.append(throw_stuff_at_wall(graph, top_n, DEPTH, num_nodes))
    return strats * 5

def write_strats(outname, strats):
    with open(outname, 'w') as file:
        for strat in strats:
            file.writelines([str(i) + "\n" for i in strat])

if __name__ == "__main__":
    data = json.load(open(FILENAME))
    edgeDict = dict()
    degs = []

    for k in data:
        edgeDict[int(k)] = [int(v) for v in data[k]]
        degs.append((len(data[k]), int(k)))
    degs = sorted(degs, reverse=True)

    baseline_strats = baseline(degs, NUM_PICKS)
    write_strats(f"baseline_{FILENAME}", baseline_strats)

    # target_strats = advanced(edgeDict, degs, int(1.0 * NUM_PICKS), 15)
    # write_strats(f"target_{FILENAME}", target_strats)

    # hard_strats = advanced(edgeDict, degs, int(1.1 * NUM_PICKS), 16)
    # write_strats(f"hard_{FILENAME}", hard_strats)
