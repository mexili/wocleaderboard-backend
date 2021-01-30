require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

const port = process.env.PORT || 8080;

const router = require('./routes');
app.use('/', router);
app.listen(port);

console.log(`Server listening at ${port}`);
