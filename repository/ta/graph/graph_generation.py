import networkx as nx
import numpy as np
import random
import pickle
import math
import json
import matplotlib.pyplot as plt

def write_graph(outname, G):
    adjacency = nx.readwrite.json_graph.adjacency_data(G)['adjacency']
    json_dict = {}
    for i in range(len(adjacency)):
        json_dict[str(i)] = [str(x['id']) for x in adjacency[i]]
    with open(outname, 'w') as file:
        print(json.dumps(json_dict), file=file)

def pref_attach(T):
    G = nx.Graph()
    # initial edge
    G.add_edge(0, 1)
    tot_edges = 1

    # add rest
    for i in range(2, T):
        G.add_node(i)
        new_edges = 0
        for j in range(1, i):
            p = G.degree(j) / tot_edges
            if random.random() < p:
                G.add_edge(i, j)
                new_edges += 1
        tot_edges += new_edges
    
    return G

def config_model(degs):
    # degrees: list of degree numbers
    G = nx.MultiGraph()
    links = []
    for i, d in enumerate(degs):
        links.extend([(i + 1) for _ in range(d)])
        G.add_node(i+1)
    # shuffle
    links = random.sample(links, len(links))
    for i in range(0, len(links) - 1, 2):
        G.add_edge(links[i], links[i + 1])
    return G


def gen_erdos_renyi(n, p):
    G = nx.Graph()
    G.add_nodes_from(range(n))
    for i in range(n):
        for j in range(i+1, n):
            if random.random() < p:
                G.add_edge(i, j)
    return G

def gen_SSBM(n, k, A, B):
    G = nx.Graph()
    clusters = dict()
    samples = list(range(k))
    for i in range(n):
        G.add_node(i)
        clusters[i] = random.sample(samples, 1)
    for i in range(n):
        for j in range(i+1, n):
            p = None
            if clusters[i] == clusters[j]:
                p = A
            else:
                p = B
            if random.random() < p:
                G.add_edge(i, j)
    return G, clusters

def gen_random_SSBN(num_to_gen):
    for _ in range(num_to_gen):
        N = random.randint(100, 1000)
        C = random.randint(3, 15)
        A = random.uniform(.1, .2)
        B = random.uniform(1, 3) / N

        G, clusters = gen_SSBM(N, C, A, B)
        write_graph(f'SSBM-{N}-{C}-{A}-{B}.json', G)

def gen_random_er(num_to_gen):
    for _ in range(num_to_gen):
        N = random.randint(100, 1000)
        p = random.uniform(1 / N, math.log(N) / N)
        G = gen_erdos_renyi(N, p)
        write_graph(f'ER-{N}.json', G)

def gen_random_pa(num_to_gen):
    for _ in range(num_to_gen):
        N = random.randint(100, 1000)
        G = pref_attach(N)
        write_graph(f'PA-{N}.json', G)

# gen_random_SSBN(14)
# gen_random_er(5)
# gen_random_pa(1)