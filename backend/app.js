const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;

const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

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

app.use(registerRoutes);
app.use(loginRoutes);
