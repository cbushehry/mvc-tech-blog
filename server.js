const express = require('express');

const path = require('path');

const routes = require('./controllers');

const sequelize = require('./config/connection');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers}); 


const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();

const PORT = process.env.PORT || 3001;


const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };


app.use(session(sess));

// handlebars init
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express sessions to handle fetch as json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express usage of public path which will have access to all js scriptst here
app.use(express.static(path.join(__dirname, 'public')));


// turn on express routes
app.use(routes);

// User sequelize to create models if any and then initalize listenting express node.js
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });