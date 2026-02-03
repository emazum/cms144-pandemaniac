pandemaniac-modelsim
====================
Backend code for the Pandemaniac contest.

# All scripts should be run from `pandemaniac-modelsim` as the working directory

Script Usage
------------
This is what's going to be used for the practice and competition rounds. The graphs used for the
competition and the teams participating are all pre-set in the `run.py` script.

    run.py --day [day or competition round] --teams [teams competing]
    run.py --day 4 --teams a b c d

For example, for competition round 2:

    run.py --day c2 --teams a b c d

There must be at least 8 teams. If not, filler teams should be added:

    run.py --day3 --teams a b c d e f filler1 filler2


Simulation Usage
----------------

    main.py --teams [team names separated by spaces] --graph [graph name] --model [model name]
    main.py --teams foo bar baz --graph 2.1.1 --model weighted_random

Possible models include:
* `majority_all`
* `majority_colored`
* `most_common_colored`
* `random_p`
* `weighted_random`

Tools
-----
* Python 3.8
* pymongo 4.2.0
* MongoDB 5/6
