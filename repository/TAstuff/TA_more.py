import compute
import json
import random

outdir = "TA_more/"
graphdir = "../pandemaniac-graphui/private/graphs/"


if __name__ == "__main__":
	for i in range(5):
		with open(graphdir+"2.10.3%d.json" % i, 'r') as g:
			graph = json.loads(''.join(g.readlines()))
		d = compute.get_top_N(graph, "degree", 12)
		b = compute.get_top_N(graph, "betweenness", 15)
		c = compute.get_top_N(graph, "closeness", 15)
		nodeset = set(b+c)
		result = []
		for _ in range(50):
			extra = random.sample(nodeset, 6)
			curset = random.sample(set(extra+d), 12)
			result += curset
		with open(outdir+"2.10.3%d.txt" % i, 'w') as of:
			for node in result:
				of.write("%s\n" % node)

