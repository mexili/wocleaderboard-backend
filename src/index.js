require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const host = '127.0.0.1';

const router = require('./routes');
app.use('/', router);
app.listen(port, host);

console.log(`Server listening at ${host}:${port}`);
