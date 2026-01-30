Link to all google drive CS 144 materials: https://drive.google.com/drive/folders/0B_Y6XnQg2vpASmxhVkx1Z1V1bzg?usp=sharing

pandemaniac-graphui
============================================================================


“public” contains all the downloads (from seemingly forever, no real reason to clear them, might be interesting to look at past team submissions). I'm not actually sure if it's used for anything, but can't claim I understand every single piece of the code. Also has css/other formatting stuff (fonts, etc).

Views has all the html, should be self-explanatory.

node-modules contains all the used modules, including d3 and my edits to d3.

Js code is kind of scattered around everywhere. I found routes, setup, and public most useful for debugging things.

"private" contains:

two folders named graphs and layout and I'm honestly not sure the difference. If I remember correctly the code uses layout. Contains the x and y coordinates of each node for a graph (for the visualizer).

uploads has uploads for each team. This, and not what is stored in public, seems to be what's used? This is cleared every time the init script is run, so to look at past teams, look at public/downloads.

Runs shows the runs results. Seems to contain the end results of each of the 50 run trials (NOT how nodes change over a run). This corresponds with what is currently shown on the visualizer. If one wants to change this, change what's written to this file from main.py in pandemaniac-modelsim.

============================================================================
Getting into the code:

Some information about the amazon instances is in the TA 144 folder (linked at the top).

1) Get the pem file for pandemaniac (from github, called cs144-pandemaniac-2016.pem)

2) in terminal:
			# chmod 400 cs144-pandemaniac-2016.pem
			# ssh -i cs144-pandemanic-2016.pem ubuntu@ec2-35-167-100-168.us-west-2.compute.amazonaws.com

	 If that doesn't work:

	 		# ssh -i cs144-pandemanic-2016.pem ubuntu@ec2-52-36-252-52.us-west-2.compute.amazonaws.com

You can see this pandemaniac instance by logging into aws with the following (may have changed):

	# Username: adamwierman@gmail.com
	# Password: ta144nestal


============================================================================
1) Initialize Redis with brew on Mac
	wait until it says
		# Server initialized
		# DB loaded from disk: 0.000 seconds
		# Ready to accept connections
	Keep Redis listening

2) Go to another tab and run
	$ node app.js

3) go to localhost:3000

4) Follow instructions in the README.doc for changing config parameters (like the start and end day of the competition). Each day of the competition will have to be manually run from the command line (instructions in the doc).


TESTING
============================================================================

Running MongoDB to test the run
1) Go to the data/db folder (code/data/db)
2) $ sudo chown -R id -un/data/db
3) run $mongod
4) Open a different terminal and run $mongo
5) This opens the database
	ex. $ show collections
6) How to find passwords:
$ show collections
$ db.teams.find()
	(you can also run $db.teams.find().pretty())
	example output:
<!-- 		{
			"_id": ObjectID("5a20e25486b43f7c8...etc. "),
			"name": "sample_team",
			"hash": "$2a$10$KbGLFAXwxZXn9I..."
		}; -->

-----------------Debugging help-------------------------------

============================================================================

if pymongo is imported but not showing up, then the problem could be that the module was installed in the incorrect location:
Solution:
1) Edit the python path in the bash rc folder. The PYTHON_PATH is the location where pip installs packages and location where python looks for packages do not match
2) Run $sudo pip show pymongo to find where pip installs packages
It should show this output:
---
Name: pymongo
Version: 3.4.0
Location: /usr/local/lib/python2.7/dist-packages

3) Now you know the location where pip installs packages. Add the following line in your .bashrc:
	$ export PYTHONPATH=$PYTHONPATH:/usr/local/lib/python2.7/dist-packages/

4) Run the following command to execute .bashrc again:
	$ source .bashrc
5) The python script should run correctly without sudo

Reference: (https://stackoverflow.com/questions/17624416/cant-import-mongoclient)

------------------------------------------------------
"Cannot connect to database error"

Delete mongo.lock and start mongodb through homebrew
1) run $brew services start mongodb
2) access the shell by $mongo

shut down your database by
1) $brew services stop mongodb
2) $brew info mongodb
