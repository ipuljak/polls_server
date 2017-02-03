// Server requirements
const express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , cors = require('cors')
  , passport = require('passport')
  , passportConfig = require('./config/passport')
  , db = require('./models')
  , {passportSecret} = require('./secrets')
  , authentication = require('./middleware/authentication')
  , app = express();

// Server setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(methodOverride('_method'));
app.set('trust proxy', 1);
app.use(session({
  secret: passportSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Route definition
const options = require('./controllers/options')
  , poll = require('./controllers/poll')
  , user = require('./controllers/user');

app.use('/api/options', options);
app.use('/api/polls', poll);
app.use('/api/users', user);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/home', authentication.IsAuthenticated, (req, res) => {
  res.send('Authenticated!!!');
});

app.post('/authenticate', passport.authenticate('local'), {
  successRedirect: '/home',
  failureRedirect: '/'
});

app.get('/logout', authentication.destroySession);





db
  .sequelize
  .sync()
  .then(() => {

    // // Example to find a user
    // db.User.findAll({ where: { username: 'ivan' } })
    //   .then((user) => {
    //     console.log(user);
    //   });

    // Start the server and listen to the specified port
    app.listen(3010, process.env.IP, () => {
      console.log('Polling Application API server started on port 3010.');
    });
  })
  .catch((err) => {
    if (err) throw err[0];
  });