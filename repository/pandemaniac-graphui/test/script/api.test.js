/**
 * Test file for the API
 */
const request = require('supertest')
, chai = require('chai')
, chaiHttp = require('chai-http')
, { app } = require('../../app.js')
, { getDB } = require('../../config/dbaccess.js')
, fs = require('fs')
, path = require('path');

chai.should();
chai.use(chaiHttp);

const validUser = {
    username: "tests1",
    password: "tests1"
}

const invalidUser = {
    username: "all",
    password: "all"
}

let runId;      // The inserted doc's id in the runs collection

before(function (done) {
    // wait for the express app start
    app.on('appStarted', () => {
        done();
    });
})

/**
 * Test register functionality
 */
describe("Register test", () => {
    it("should display a register page", (done) => {
        request(app)
            .get("/register")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.html;
                done();
            });
    });

    it("should register new user with valid credentials", (done) => {
        request(app)
            .post("/register")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(validUser)
            .end((err, res) => {
                res.should.have.status(302);
                res.should.to.redirectTo("/");
                done();
            });
    });

    it("should not register new user with invalid username", (done) => {
        request(app)
            .post("/register")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(invalidUser)
            .end((err, res) => {
                res.should.have.status(302);
                res.should.to.redirectTo("/register");
                done();
            })
    });

    it("should not register new user with an existing username", (done) => {
        request(app)
            .post("/register")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(validUser)
            .end((err, res) => {
                res.should.have.status(302);
                res.should.to.redirectTo("/register");
                done();
            })
    });
})

/**
 * Test login/logout functionality without logged in
 */
describe("Login/logout Test without Logged in", () => {
    it("should be able to show the login page if anonymous", (done) => {
        request(app)
            .get('/login')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.html;
                done();
            });
    });

    it("should be able to log in if correct user name and password is supplied", (done) => {
        request(app)
            .post('/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(validUser)
            .end((err, res) => {
                res.should.have.status(302);
                res.should.to.redirectTo("/");
                done();
            })
    });

    it("should not be able to login if password is wrong", (done) => {
        request(app)
            .post('/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(invalidUser)
            .end((err, res) => {
                res.should.have.status(302);
                res.should.to.redirectTo("/login");
                done();
            })
    });
})

/**
 * Test login/logout functionality logged in
 */
describe("Login/logout Test with Logged in", () => {
    let agent = chai.request.agent(app);
    before(function (done) {
        agent
            .post('/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(validUser)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it("should be able to logout if logged in", (done) => {
        agent
            .get('/logout')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.include('Successfully logged out');
                done();
            })
    });

    after(() => {
        agent.close();
    });
});

/**
 * Test result functionality
 */
describe("Result page test", () => {
    let agent = chai.request.agent(app);
    let runsID;
    before(async function () {
        const db = getDB();
        try {
            res = await agent
                .post('/login')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(validUser);
            res.should.have.status(200);

            let insertRes = await db.collection("runs").insertOne({
                graph: '2.10.10',
                file: '2.10.10-1666565352.64378.txt',
                scores: {
                    'test1': 15, 
                    'TA_degree': 20
                },
                teams: [ 'tests1', 'TA_degree' ],
                iteration_file: '2.10.10-1667484266.308106-iteration.txt'
            });
            runsID = insertRes.insertedId.toString();
        } catch (err) {
            console.error(err);
        }
    });

    it("should be able to see the result page if logged in", (done) => {
        agent
            .get('/graph')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.include('tests1');
                res.text.should.include('day1');
                done();
            })
    });

    it("should be able to see an individual result", (done) => {
        const graphAPI = '/graph/' + runsID;
        agent
            .get(graphAPI)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it("should be able to get the graph structure", (done) => {
        const structureAPI = '/api/v1/graph/' + runsID + '/structure';
        agent
            .get(structureAPI)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })

    it("should be able to get the graph layout", (done) => {
        const layoutAPI = '/api/v1/graph/' + runsID + '/layout';
        agent
            .get(layoutAPI)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })

    it("should be able to get the graph model", (done) => {
        const modelAPI = '/api/v1/graph/' + runsID + '/model';
        agent
            .get(modelAPI)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })

    it("should be able to get the graph iteration", (done) => {
        const iterationAPI = '/api/v1/graph/' + runsID + '/iteration';
        agent
            .get(iterationAPI)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })

    after(() => {
        agent.close();
    })
});

/**
 * Test submit functionality
 */
describe("Submit Functionality Test", () => {
    let agent = chai.request.agent(app);
    before(function (done) {
        const db = getDB();
        // update a graph to be unexpired and very little timeout
        let query = { name: '2.5.1' };
        let update = { $set: { end: new Date("2199-02-21T08:00:00.000Z"), timeout: 2}};
        db.collection('graphs').updateOne(query, update);
        // update a graph to be expired
        query = { name: '4.5.1' };
        update = { $set: { end: new Date("2022-02-21T08:00:00.000Z")}};
        db.collection('graphs').updateOne(query, update);

        agent
            .post('/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(validUser)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it("should be able to get the submit page when logged in", (done) => {
        agent
            .get('/submit')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it("should be able to visit a single submit page", (done) => {
        agent
            .get('/submit/2.5.1')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.include("Please refresh after download completes.");
                done();
            })
    });

    it("should be able to download a graph file", (done) => {
        agent
            .get('/submit/2.5.1/download')
            .end((err, res) => {
                res.should.have.status(200);
                res.header['content-disposition'].should.equal('attachment; filename="2.5.1.json"');
                done();
            })
    });

    it("should be able to submit files to an unexpired graph", async () => {
        let res = await agent
            .post('/submit/2.5.1/upload')
            .type('form')
            .attach('vertices', 'test/files/2.5.1.txt');
        
        res.should.have.status(200);
        res.text.should.include('Successfully uploaded for graph 2.5.1.');

        const db = getDB();
        let res2;
        try {
            res2 = await db.collection("attempts").findOne({ graph: '2.5.1', team: 'tests1'});
        } catch (e) {
            console.error(e);
        }
        chai.should().not.equal(res2, null);
    });

    it("should not be able to submit files to an expired graph", async () => {
        let res = await agent
            .post('/submit/4.5.1/upload')
            .type('form')
            .attach('vertices', 'test/files/4.5.1.txt');
        res.should.have.status(400);

        const db = getDB();
        let res2;
        try {
            res2 = await db.collection("attempts").findOne({ graph: '4.5.1', team: 'tests1'});
        } catch (e) {
            console.error(e);
        }
        chai.should().equal(res2, null);
    });

    it("should not be able to submit files after graph timed out", (done) => {
        setTimeout(async () => {
            let res = await agent
            .post('/submit/2.5.1/upload')
            .type('form')
            .attach('vertices', 'test/files/2.5.1.txt');
            res.should.have.status(400);
            done();
        }, 2000);
    });

    after(() => {
        agent.close();
    });
})


// Clean the database after test
after(async function () {
    const db = getDB();
    try {
        await db.collection("teams").deleteMany({});
        await db.collection("runs").deleteMany({});
        await db.collection("attempts").deleteMany({});
        // remove all generated files under test
        emptyDir(path.join('test', 'uploads'));
    } catch (err) {
        console.error(err);
    }
})

function emptyDir(dirPath) {
    const dirContents = fs.readdirSync(dirPath); // List dir content
  
    for (const fileOrDirPath of dirContents) {
      try {
        // Get Full path
        const fullPath = path.join(dirPath, fileOrDirPath);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          // It's a sub directory
          if (fs.readdirSync(fullPath).length) emptyDir(fullPath);
          // If the dir is not empty then remove it's contents too(recursively)
          fs.rmdirSync(fullPath);
        } else fs.unlinkSync(fullPath); // It's a file
      } catch (ex) {
        console.error(ex.message);
      }
    }
  }