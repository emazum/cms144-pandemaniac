### Environment

Python version: 2.7.16 (and things to watch out for if &rarr; 3):

- some commented lines are fixes (end/search for `python3`)
- right now there is a line with a db call that is strangely incompatible with 3

npm: 8.4.1?
Here is what `npm list` spits out (in repository/): 

├── @stdlib/stdlib@0.0.96 <br>
├── bcrypt@5.0.1 <br>
├── connect-flash@0.1.1 <br>
├── express@4.17.2 <br>
├── ink-docstrap@1.3.2 <br>
└── mongodb@2.2.36 <br>

Here is what `npm list` spits out (in pandemaniac-graphui/): 
├── bcrypt-nodejs@0.0.3 <br>
├── bluebird@3.4.7 <br>
├── connect-flash@0.1.1 <br>
├── connect-redis@1.4.1 <br>
├── d3-node@2.2.3 <br>
├── d3@3.5.17 <br>
├── express-session@1.17.2 <br>
├── express@3.21.2 <br>
├── jade@1.11.0 <br>
├── line-reader@0.4.0 <br>
├── markdown@0.5.0 <br>
├── mongodb@2.2.36 <br>
├── passport-local@1.0.0 <br>
├── passport@0.5.2 <br>
├── redis@3.0.1 <br>
└── underscore@1.13.2 <br>


node: v16.6.1?
- these seem high... lmk if you need other package versions
- remember to `node_modules/multiparty/index.js`: change `os.tmpDir` &rarr; `os.mpdir()`
if doing fresh npm install

pacakge.json is still a mess (not sure what the carrot does)

The only thing in the repo that should not be there is pymongo-2.6.1.tar.gz. I include it bc it took me awhile to find (that one of the readme's specified some 2.6.x). I forgot if I installed this separately or what. I also include node_modules/ bc I panic

<br><br>

### General notes:
redis is fidgety, run `ps aux | grep redis-server` in command line (if on mac), and kill the process if the `sh start-pandemaniac.sh` gives you trouble. mongo is more well behaved

I am going to make a .gitignore and only put data/db/ and logs/ (but their existence is necessary otherwise the scripts won't know what to write to... they'll just be empty on git). 

There are 3 other "readme" type things. I find README1 most helpful for getting set up, but I sense README2 and Wizardry will soon become relevant. Here is the link to the original repository in all its glory: https://github.com/cs144caltech/pandemaniac
<br><br>

### Zoom notes:
in ensureIndices: db.ensureIndex() is now db.createIndex()

multiparty/index.js in node_modules change os.tmpDir to os.tmpdir
