import sys
from os import path

# Go up two directories
sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))

from simulation import *

def test_init():
    pass

def test_is_stable():
    pass

def test_run():
    # Esssentially an integration test. Do multiple types of graphs.
    pass

if __name__ == '__main__':
    test_init()
    test_is_stable()
    test_run()

    print('simulation.py tests passed.')