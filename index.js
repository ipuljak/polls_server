// Server requirements
const express = require('express')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , cors = require('cors')
  //, passport = require('passport')
  //, passportConfig = require('./config/passport')
  , db = require('./models')
  //, {passportSecret} = require('./secrets')
  , app = express();

// Server setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(methodOverride('_method'));

// Route definition
const options = require('./controllers/options')
  , poll = require('./controllers/poll')
  , user = require('./controllers/user');

app.use('/api/options', options);
app.use('/api/polls', poll);
app.use('/api/users', user);

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