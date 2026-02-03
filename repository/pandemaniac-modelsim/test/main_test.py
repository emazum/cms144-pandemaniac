import sys
from os import path

# Go up two directories
sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))

from main import *

def test_create_adj_list():
    expected_sol = {"0": ["1", "2", "3"], "1":["0"], "2":["0"], "3":["0"]}
    with open("test/test-graphs/test_graph_1.json", "r") as file:
        output = create_adj_list(file)
    if not output == expected_sol:
        raise Exception("create_adj_list failed")

def test_update_points():
    pass

def test_calc_final_scores():
    pass

if __name__ == '__main__':
    test_create_adj_list()
    test_update_points()
    test_calc_final_scores()
    print('main.py tests passed.')
