const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port);
