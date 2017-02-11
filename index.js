// Server requirements
const express = require('express')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , cors = require('cors')
  , db = require('./models')
  , app = express();

// Server setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(methodOverride('_method'));

// Route definition
const auth = require('./controllers/auth')
  , options = require('./controllers/options')
  , poll = require('./controllers/poll')
  , user = require('./controllers/user');

// Controllers for path routing
app.use('/api/auth', auth);
app.use('/api/options', options);
app.use('/api/polls', poll);
app.use('/api/users', user);

// Synchronize the database and start the server
db
  .sequelize
  .sync()
  .then(() => {
    // Start the server and listen to the specified port
    app.listen(3010, process.env.IP, () => {
      console.log('Polling Application API server started on port 3010.');
    });
  })
  .catch(err => {
    if (err) throw err[0];
  });