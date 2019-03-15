const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://joseche93:21044909@clusterducks-rovjz.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true })
    .then(() => app.listen(port))
    .catch((error) => {
        console.log(error);
    });
