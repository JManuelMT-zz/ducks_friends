const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 3001;

const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const activitiesRoutes = require('./routes/activitiesRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://joseche93:21044909@duckscluster-rovjz.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true })
    .then(() => {
        app.listen(port);
    })
    .catch((error) => {
        console.log(error);
    });

app.use(session({
    secret: 'secretDucks',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(registerRoutes);
app.use(loginRoutes);
app.use(activitiesRoutes);
