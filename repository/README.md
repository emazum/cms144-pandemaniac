# Software versions AWS new spin-up
| Software | Version |
| -------- | ------- |
| Ubuntu (running on Amazon EC2) | 20.04 LTS |
| Redis | 7.0.5 |
| MongoDB | 6.0.2 |
| node.js | 18.12.0 |
| npm | 8.19.2 |
| pymongo | 4.3.2 |

# Before first run
## Setup the node.js environment
```bash
cd pandemaniac-graphui
npm install
```
## Setup the python environment
```bash
pip3 install pymongo
```
## Initialize the project and clean the database
```bash
sh init-pandemaniac.sh
```

# How to start
## Launch the website
1. Stop existing redis: `sudo service redis stop`
2. Start mongodb: `sudo service mongod start`
3. If from scratch, run `init-pandemaniac.sh`
    If don't want to clear uploads/folders, just run the mongoDB setup code + scripts
4. Run `start-pandemaniac.sh`

Also helpful for address in use: `lsof -i :{PORT}`

## Simulate the results for a day
0. Backup db with ./make-db-backup.sh
1. Copy TA graphs with `./copy-ta-graphs.sh`
2. Set working directory to pandemaniac-modelsim
3. Run `python3 run.py --day {DAY} --team {TEAM1} {TEAM2} ...`
4. To run all teams, run `python3 run.py --day {DAY} --team all`

## Test the nodejs
```bash
(sh init-pandemaniac-test.sh && cd pandemaniac-graphui && npm test)
```

## Test the modelsim
1. Set working directory to pandemaniac-modelsim
2. Run desired tests in pandemaniac-modelsim/test

## Spin up AWS Instance
1. Create Instance, set up "elastic IP" to give static IP for the website.
2. Connect with private key or .pem file. Instance should have git.
3. Clone Repo. Install redis, mongodb, npm, node.js. Check/update versions.
4. Set up environment (npm install, pip3 pymongo), start website. See above.
5. Edit security group to open port 80 for HTTP. Only port 80 is allowed on EC2.
6. Port forward to the correct port, currently 3000.
    `sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`

## Change the graphs / TA challenges
1. Change ta submissions in ta/submissions as necessary in
2. Change graph files and descriptions in 
a) pandemaniac-graphui/setup
b) pandemaniac-graphui/private/graphs
c) pandemaniac-modelsim/CONFIG.py
3. Update visualization layouts in private/layouts. Random layouts will work,
as forces/physics will adjust the positioning.
 
