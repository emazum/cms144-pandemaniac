/**
 * Module dependencies
 */

const express = require('express')
, flash = require('connect-flash')
, http = require('http')
, net = require('net')
, path = require('path')
, session = require('express-session')
, morgan = require('morgan')
, { connectToDB, getDB } = require('./config/dbaccess.js')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, favicon = require('serve-favicon')
, methodOverride = require('method-override')
, { promisifyAll } = require('bluebird')
, redis = require('redis')
, multer = require('multer')
, multer_upload = multer({dest: 'private/temp_uploads',
                        limits: {fileSize: 20 * 1024 * 1024}})
, passport = require('passport')
, bcrypt = require('bcrypt')
, LocalStrategy = require('passport-local').Strategy;

let routes = require('./routes')
, submit = require('./routes/submit')
, team = require('./routes/team')
, graph = require('./routes/graph');
 
const app = express();

const runApplication = async () => {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'pug');
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(express.static(path.join(__dirname, 'public')));

    // Set up error handling
    if (app.get('env') === 'development') {
        app.locals.pretty = true;
    } else if (app.get('env') === 'production') {
        app.use(function(err, req, res, next) {
            console.error(err.stack);
            res.status(500).render('500');
        });
        app.locals.pretty = true;
    }

    // Authentication functions
    function restrict(req, res, next) {
        if (req.user) {
            return next();
        }
    
        res.redirect('/login');
    }
    
    function anonymous(req, res, next) {
        if (!req.user) {
            return next();
        }

        res.redirect('/');
    }

    await connectToDB();
    const db = getDB();

    // Set up redis
    promisifyAll(redis);
    const RedisStore = require('connect-redis')(session);
    const redisClient = redis.createClient({ legacyMode: true });
    await redisClient.connect();

    // Store session in redis
    app.use(
        session({ 
            store: new RedisStore({ client: redisClient }), 
            resave: false,
            saveUninitialized: true,
            secret: 'keyboard cat' 
        })
    );
    
    // Set up passport
    passport.use(new LocalStrategy(async function verify(username, password, done) {
        const teams = db.collection("teams");
        try {
            let team = await teams.findOne( {name: username} );
            if (!team) {
                return done(null, false, { message: 'Invalid username.' })
            }
            const match = await bcrypt.compare(password, team.hash);
            if (!match) {
                return done(null, false, { message: 'Invalid password.' })
            }
            done(null, team);
        } catch (e) {
            return done(e);
        }
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.name);
    });
    passport.deserializeUser(function(username, done) {
        done(null, username);
    });
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // Middleware to refresh notifications
    app.use(function(req, res, next) {
        res.locals.title = 'Pandemaniac';
        res.locals.error = req.flash('error');
        res.locals.warn = req.flash('warn');
        res.locals.info = req.flash('info');
        res.locals.log = req.flash('log')
        res.locals.user = !!req.user;
        
        next(null, req, res);
    });

    team = team(passport, db);
    submit = submit(db, redisClient);
    graph = graph(db);

    // Routes
    app.get('/', routes.index);
    
    // Set up team routes
    app.get('/register-hidden', anonymous, team.register);
    app.post('/register-hidden', anonymous, team.doRegister);
    app.get('/login', anonymous, team.login);
    app.post('/login', anonymous, team.doLogin);
    app.get('/logout', restrict, team.logout);

    // Set up submit routes
    app.get('/submit', restrict, submit.list);
    app.get('/submit/:id', restrict, submit.index);
    app.get('/submit/:id/download', restrict, submit.download);
    app.post('/submit/:id/upload', [restrict, multer_upload.single('vertices')], submit.upload);

    // Set up graph routes
    app.get('/graph', restrict, graph.list);
    app.get('/graph/download', graph.download);
    app.get('/graph/:id', restrict, graph.index);
    app.get('/api/v1/graph/:id/structure', restrict, graph.structure);
    app.get('/api/v1/graph/:id/layout', restrict, graph.layout);
    app.get('/api/v1/graph/:id/model', restrict, graph.model);
    app.get('/api/v1/graph/:id/iteration', restrict, graph.iteration);

    // Fallback to 404 if no matching route found
    app.use(function(req, res) {
        res.status(404).render('404');
    });

    // Start app
    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
        app.emit('appStarted');
    });
}

runApplication();

module.exports = exports = { app };