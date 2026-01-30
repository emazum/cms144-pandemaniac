import json
import sys
import sim

# Usage
#
#   python test.py [graph_file] [num_nodes] [seed_node_file1] [seed_node_file2] ...
#

if __name__ == '__main__':
    graph_file = open(sys.argv[1], 'r')
    graph = json.loads("".join(graph_file.readlines()))
    graph_file.close()
    games = 50
    nodes_len = int(sys.argv[2])
    nodes_list = {}
    for i in range(3, len(sys.argv)):
        name = sys.argv[i].strip('.txt')
        with open(sys.argv[i], 'r') as f:
            nodes = f.read().split('\n')
            nodes_list[name] = []
            for i in range(games):
                nodes_list[name].append(nodes[nodes_len*i: nodes_len*(i+1)])
    result = sim.run(graph, nodes_list, games)

    # Print results
    # print("Nodes selection")
    # for team in nodes_list:
    #     print(team, str(nodes_list[team]))
    #
    # for i, (scores, nodes, generation) in enumerate(result):
    #     # print result
    #     print("Round " + str(i+1))
    #     print("Number of iteration: " + str(generation))
    #     print("Score: ")
    #     for team in scores:
    #         print(team)
    #         print(scores[team])
    #     print("Seed nodes: ")
    #     for team in nodes:
    #         print(team)
    #         print(nodes[team])
